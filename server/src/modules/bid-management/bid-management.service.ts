import { Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { BidStatus } from "@prisma/client";

@Injectable()
export class BidManagementService {
  private readonly logger = new Logger(BidManagementService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  // Get all bids with filters
  async getBids(filters?: {
    status?: BidStatus;
    contractorEmail?: string;
    projectName?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.contractorEmail) where.contractor = filters.contractorEmail;
    if (filters?.projectName) {
      where.projectName = {
        contains: filters.projectName,
        mode: "insensitive",
      };
    }

    const [bids, total] = await Promise.all([
      this.databaseService.bid.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
          email: {
            select: {
              subject: true,
              body: true,
              date: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      this.databaseService.bid.count({ where }),
    ]);

    return {
      bids,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Update bid status
  async updateBidStatus(bidId: string, status: BidStatus, userId?: string) {
    const bid = await this.databaseService.bid.update({
      where: { id: bidId },
      data: {
        status,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        email: true,
      },
    });

    this.logger.log(`📝 Bid ${bidId} status updated to ${status}`);

    // TODO: Send notification to contractor
    // await this.notificationService.sendBidStatusUpdate(bid);

    return bid;
  }

  // Get bid by ID
  async getBidById(bidId: string) {
    return await this.databaseService.bid.findUnique({
      where: { id: bidId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
        email: true,
        Contract: true,
      },
    });
  }

  // Get bids statistics
  async getBidsStats() {
    const [totalBids, pendingBids, approvedBids, rejectedBids, recentBids] =
      await Promise.all([
        this.databaseService.bid.count(),
        this.databaseService.bid.count({ where: { status: "PENDING" } }),
        this.databaseService.bid.count({ where: { status: "APPROVED" } }),
        this.databaseService.bid.count({ where: { status: "REJECTED" } }),
        this.databaseService.bid.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
            },
          },
        }),
      ]);

    return {
      total: totalBids,
      pending: pendingBids,
      approved: approvedBids,
      rejected: rejectedBids,
      recent: recentBids,
    };
  }

  // Delete bid
  async deleteBid(bidId: string) {
    const bid = await this.databaseService.bid.delete({
      where: { id: bidId },
    });

    this.logger.log(`🗑️ Bid ${bidId} deleted`);
    return bid;
  }

  // Get contractor's bids
  async getContractorBids(contractorEmail: string) {
    return await this.databaseService.bid.findMany({
      where: { contractor: contractorEmail },
      include: {
        email: {
          select: {
            subject: true,
            date: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
