import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { User, UserProfile } from "@/interface/user.interface";
// import { User, UserProfile } from "./user.interface";

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCurrentUser(userId: string): Promise<User> {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          // Add other fields you want to expose
        },
      });

      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to retrieve user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          // Add profile-specific fields
          bids: true, // If you want to include relationships
          contracts: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new HttpException("User profile not found", HttpStatus.NOT_FOUND);
      }

      return {
        ...user,
        // Map any additional profile fields
        phoneNumber: user["phoneNumber"] || null, // Example if you add these fields
        address: user["address"] || null,
        profilePicture: user["profilePicture"] || null,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to retrieve user profile",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
