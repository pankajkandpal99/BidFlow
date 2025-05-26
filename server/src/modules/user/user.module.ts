import { Module } from "@nestjs/common";

import { DatabaseService } from "@/database/database.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService], // Export service if needed in other modules
})
export class UserModule {}
