import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { ImapModule } from "../imap/imap.module";
import { EmailProcessingModule } from "../email-processing/email.processing.module";
import { BidManagementModule } from "../bid-management/bidmanagement.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ImapModule,
    EmailProcessingModule,
    BidManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
