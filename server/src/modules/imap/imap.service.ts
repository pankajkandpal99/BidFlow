import { Injectable, Logger } from "@nestjs/common";
import * as imap from "imap-simple";
import { parseEmail, getImapConfig } from "./imap.utils";
import { BidEmail } from "./imap.types";

@Injectable()
export class ImapService {
  private readonly logger = new Logger(ImapService.name);

  async connect() {
    return imap.connect({ imap: getImapConfig() });
  }

  async fetchAndProcessEmails(): Promise<BidEmail[]> {
    const connection = await this.connect();

    try {
      await connection.openBox(process.env.BID_EMAIL_FOLDER || "INBOX");

      const searchCriteria = ["UNSEEN"];
      const fetchOptions = {
        bodies: ["HEADER", "TEXT", ""],
        markSeen: true, // True in production
      };

      const messages = await connection.search(searchCriteria, fetchOptions);

      if (messages.length === 0) {
        return [];
      }

      this.logger.log(`📨 Processing ${messages.length} new emails`);
      const bids: BidEmail[] = [];

      for (const message of messages) {
        if (message.parts && message.parts.length > 0) {
          const part = message.parts[0]; // Use the first part (full email) for parsing

          try {
            const email = await parseEmail(part.body);

            if (email.from && email.subject && email.isBid) {
              bids.push(email);
              this.logger.log(
                `🎯 Bid email from ${email.from}: ${email.subject}`
              );
            } else if (email.isBid) {
              this.logger.warn(
                `⚠️ Bid email with missing data: ${email.subject}`
              );
            }
          } catch (error: any) {
            this.logger.error(`❌ Failed to parse email:`, error.message);
          }
        }
      }

      return bids;
    } catch (error) {
      this.logger.error("❌ IMAP Error:", error);
      throw error;
    } finally {
      connection.end();
    }
  }

  // Health check method
  async testConnection(): Promise<boolean> {
    try {
      const connection = await this.connect();
      connection.end();
      return true;
    } catch (error) {
      this.logger.error("❌ IMAP Connection Test Failed:", error);
      return false;
    }
  }
}

