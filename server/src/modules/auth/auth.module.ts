import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
