import { Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { ImapService } from "../imap/imap.service";
import { BidEmail } from "../imap/imap.types";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class EmailProcessingService {
  private readonly logger = new Logger(EmailProcessingService.name);

  constructor(
    private readonly imapService: ImapService,
    private readonly databaseService: DatabaseService
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async processNewEmails() {
    this.logger.log("🔄 Checking for new bid emails...");

    try {
      const bidEmails = await this.imapService.fetchAndProcessEmails();

      if (bidEmails.length > 0) {
        this.logger.log(`📧 Found ${bidEmails.length} new bid emails`);

        for (const bidEmail of bidEmails) {
          await this.processBidEmail(bidEmail);
        }
      } else {
        this.logger.log("📭 No new bid emails found");
      }
    } catch (error) {
      this.logger.error("❌ Error processing emails:", error);
    }
  }

  async processEmailsNow(): Promise<BidEmail[]> {
    this.logger.log("🚀 Manual email processing triggered");

    try {
      const bidEmails = await this.imapService.fetchAndProcessEmails();

      for (const bidEmail of bidEmails) {
        await this.processBidEmail(bidEmail);
      }

      return bidEmails;
    } catch (error) {
      this.logger.error("❌ Manual processing failed:", error);
      throw error;
    }
  }

  private async processBidEmail(bidEmail: BidEmail): Promise<void> {
    try {
      const savedEmail = await this.saveEmail(bidEmail); // First save the email
      const contractorInfo = this.extractContractorInfo(bidEmail); // Extract contractor information
      const user = await this.findOrCreateContractor(contractorInfo); // Find or create user (contractor)
      const bid = await this.createBid(bidEmail, savedEmail.id, user.id); // Create bid entry

      this.logger.log(`✅ Successfully processed bid from ${bidEmail.from}`);
    } catch (error) {
      this.logger.error(
        `❌ Failed to process email from ${bidEmail.from}:`,
        error
      );
    }
  }

  private async saveEmail(bidEmail: BidEmail) {
    return await this.databaseService.email.create({
      data: {
        subject: bidEmail.subject,
        body: bidEmail.body,
        from: bidEmail.from,
        to: process.env.IMAP_USER!,
        date: bidEmail.receivedAt,
        attachments: [], // TODO: Handle attachments later
      },
    });
  }

  private extractContractorInfo(bidEmail: BidEmail) {
    const contractorName =
      this.extractNameFromEmail(bidEmail.from) || bidEmail.from; // Extract contractor name from email or use email as fallback

    return {
      email: bidEmail.from,
      name: contractorName,
    };
  }

  private extractNameFromEmail(email: string): string | null {
    const parts = email.split("@")[0]; // Simple name extraction - can be improved
    return parts.replace(/[._-]/g, " ").replace(/\d+/g, "").trim() || null;
  }

  private async findOrCreateContractor(contractorInfo: {
    email: string;
    name: string;
  }) {
    let user = await this.databaseService.user.findUnique({
      where: { email: contractorInfo.email }, // Check if user already exists
    });

    if (!user) {
      // Create new contractor user
      user = await this.databaseService.user.create({
        data: {
          email: contractorInfo.email,
          username: contractorInfo.name,
          password: "Password@123", // TODO: Generate proper password or use OAuth and hash the password
          role: "USER",
        },
      });

      this.logger.log(`👤 Created new contractor: ${contractorInfo.email}`);
    }

    return user;
  }

  private async createBid(bidEmail: BidEmail, emailId: string, userId: string) {
    const projectInfo = this.extractProjectInfo(bidEmail); // Extract project information from email

    return await this.databaseService.bid.create({
      data: {
        projectName: projectInfo.projectName,
        projectId: projectInfo.projectId,
        contractor: bidEmail.from,
        contractorId: userId,
        status: "PENDING",
        value: projectInfo.bidValue,
        emailId: emailId,
        userId: userId,
        dueDate: projectInfo.dueDate,
        attachments: [], // TODO: Handle attachments
      },
    });
  }

  private extractProjectInfo(bidEmail: BidEmail) {
    const subject = bidEmail.subject;
    const body = bidEmail.body;

    let projectName = subject
      .replace(/bid|quotation|proposal|quote/i, "")
      .trim(); // Extract project name (simple implementation)
    if (!projectName || projectName.length < 3) {
      projectName = `Project from ${bidEmail.from}`;
    }

    const bidValue = this.extractBidValue(body); // Extract bid value from body

    const projectId = `PROJ_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 5)}`; // Generate project ID

    const dueDate = this.extractDueDate(body); // Extract due date (if mentioned)

    return {
      projectName,
      projectId,
      bidValue,
      dueDate,
    };
  }

  private extractBidValue(text: string): number | null {
    const patterns = [
      /₹?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:rupees?|rs\.?|inr)?/i,
      /(?:usd|dollars?|\$)\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i,
      /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:₹|rs\.?|rupees?|dollars?|usd|\$)/i,
    ]; // Look for currency patterns

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const value = parseFloat(match[1].replace(/,/g, ""));
        if (!isNaN(value)) {
          return value;
        }
      }
    }

    return null;
  }

  private extractDueDate(text: string): Date | null {
    const datePatterns = [
      /due\s+(?:by|on)\s+(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i,
      /deadline\s*:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i,
      /submit\s+by\s+(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i,
    ]; // Simple due date extraction - can be improved

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        const dateStr = match[1];
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }

    return null;
  }
}
