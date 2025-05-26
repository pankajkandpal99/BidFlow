import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '@/common/middleware/jwt-auth.middleware';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @UseGuards(JwtAuthGuard) // This route requires authentication
  async getCurrentUser(@Request() req: AuthenticatedRequest) {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        throw new HttpException(
          'User ID not found in token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = await this.userService.getCurrentUser(userId);
      
      if (!user) {
        throw new HttpException(
          'User not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        data: user,
        message: 'User details retrieved successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        {
          success: false,
          error: (error instanceof Error ? error.message : 'Failed to fetch user details'),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) // Another protected route
  async getUserProfile(@Request() req: AuthenticatedRequest) {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        throw new HttpException(
          'User ID not found in token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const profile = await this.userService.getUserProfile(userId);
      
      return {
        success: true,
        data: profile,
        message: 'User profile retrieved successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        {
          success: false,
          error: (error instanceof Error ? error.message : 'Failed to fetch user profile'),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}