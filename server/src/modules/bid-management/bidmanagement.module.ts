import { Module } from "@nestjs/common";
import { BidManagementService } from "./bid-management.service";
import { BidManagementController } from "./bid-management.controller";
import { DatabaseModule } from "../../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [BidManagementController],
  providers: [BidManagementService],
  exports: [BidManagementService],
})
export class BidManagementModule {}
