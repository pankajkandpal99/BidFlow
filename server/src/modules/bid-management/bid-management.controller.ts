import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { BidManagementService } from "./bid-management.service";
import { BidStatus } from "@prisma/client";

@Controller("bids")
export class BidManagementController {
  constructor(private readonly bidManagementService: BidManagementService) {}

  // Get all bids with filters and pagination
  @Get()
  async getBids(
    @Query("status") status?: BidStatus,
    @Query("contractorEmail") contractorEmail?: string,
    @Query("projectName") projectName?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    try {
      const filters = {
        status,
        contractorEmail,
        projectName,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
      };

      const result = await this.bidManagementService.getBids(filters);

      return {
        success: true,
        message: "Bids retrieved successfully",
        data: result.bids,
        pagination: result.pagination,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: "Failed to retrieve bids",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get bid statistics for dashboard
  @Get("stats")
  async getBidsStats() {
    try {
      const stats = await this.bidManagementService.getBidsStats();

      return {
        success: true,
        message: "Bid statistics retrieved successfully",
        data: stats,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: "Failed to retrieve bid statistics",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get specific bid by ID
  @Get(":id")
  async getBidById(@Param("id") bidId: string) {
    try {
      const bid = await this.bidManagementService.getBidById(bidId);

      if (!bid) {
        throw new HttpException(
          {
            success: false,
            message: "Bid not found",
          },
          HttpStatus.NOT_FOUND
        );
      }

      return {
        success: true,
        message: "Bid retrieved successfully",
        data: bid,
      };
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          success: false,
          message: "Failed to retrieve bid",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Update bid status
  @Put(":id/status")
  async updateBidStatus(
    @Param("id") bidId: string,
    @Body() updateData: { status: BidStatus; userId?: string }
  ) {
    try {
      // Validate status
      const validStatuses: BidStatus[] = ["PENDING", "APPROVED", "REJECTED"];
      if (!validStatuses.includes(updateData.status)) {
        throw new HttpException(
          {
            success: false,
            message: "Invalid bid status",
          },
          HttpStatus.BAD_REQUEST
        );
      }

      const bid = await this.bidManagementService.updateBidStatus(
        bidId,
        updateData.status,
        updateData.userId
      );

      return {
        success: true,
        message: `Bid status updated to ${updateData.status}`,
        data: bid,
      };
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          success: false,
          message: "Failed to update bid status",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get contractor's bids
  @Get("contractor/:email")
  async getContractorBids(@Param("email") contractorEmail: string) {
    try {
      const bids = await this.bidManagementService.getContractorBids(
        contractorEmail
      );

      return {
        success: true,
        message: "Contractor bids retrieved successfully",
        data: bids,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: "Failed to retrieve contractor bids",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete bid (admin only)
  @Delete(":id")
  // @UseGuards(JwtAuthGuard, AdminGuard) // Add proper guards later
  async deleteBid(@Param("id") bidId: string) {
    try {
      const bid = await this.bidManagementService.deleteBid(bidId);

      return {
        success: true,
        message: "Bid deleted successfully",
        data: bid,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: "Failed to delete bid",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Health check for bid management
  @Get("health/check")
  async healthCheck() {
    try {
      const stats = await this.bidManagementService.getBidsStats();

      return {
        success: true,
        message: "Bid management service is healthy",
        data: {
          totalBids: stats.total,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: "Bid management service unhealthy",
          error: error.message,
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}
