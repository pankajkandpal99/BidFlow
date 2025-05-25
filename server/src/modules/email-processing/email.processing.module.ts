import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { EmailProcessingService } from "./email-processing.service";
import { EmailProcessingController } from "./email-processing.controller";
import { ImapModule } from "../imap/imap.module";
import { DatabaseModule } from "../../database/database.module";

@Module({
  imports: [
    ScheduleModule.forRoot(), // Enable cron jobs
    ImapModule,
    DatabaseModule,
  ],
  controllers: [EmailProcessingController],
  providers: [EmailProcessingService],
  exports: [EmailProcessingService],
})
export class EmailProcessingModule {}
