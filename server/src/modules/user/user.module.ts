import { Module } from "@nestjs/common";
import { UserController } from "../../user/user.controller";
import { UserService } from "../../user/user.service";
import { DatabaseService } from "@/database/database.service";

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService], // Export service if needed in other modules
})
export class UserModule {}
