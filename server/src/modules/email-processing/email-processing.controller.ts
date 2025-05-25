import { Controller, Post, Get, UseGuards } from "@nestjs/common";
import { EmailProcessingService } from "./email-processing.service";
import { ImapService } from "../imap/imap.service";

@Controller("email-processing")
export class EmailProcessingController {
  constructor(
    private readonly emailProcessingService: EmailProcessingService,
    private readonly imapService: ImapService
  ) {}

  // Manual trigger for processing emails
  @Post("process-now")
  // @UseGuards(JwtAuthGuard) // Add authentication later
  async processEmailsNow() {
    try {
      const results = await this.emailProcessingService.processEmailsNow();
      return {
        success: true,
        message: `Processed ${results.length} bid emails`,
        data: results,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Failed to process emails",
        error: error.message,
      };
    }
  }

  // Health check endpoint
  @Get("health")
  async checkHealth() {
    try {
      const imapStatus = await this.imapService.testConnection();
      return {
        success: true,
        imap: imapStatus ? "Connected" : "Failed",
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Get processing status
  @Get("status")
  async getStatus() {
    return {
      success: true,
      message: "Email processing service is running",
      cronJob: "Every 2 minutes",
      timestamp: new Date().toISOString(),
    };
  }
}
