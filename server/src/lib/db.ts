import { DatabaseService } from "@/database/database.service";
import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class PrismaOperationsService {
  private readonly logger = new Logger(PrismaOperationsService.name);

  constructor(private readonly prisma: DatabaseService) {}

  // Transaction wrapper - main feature for handling all DB operations
  async executeTransaction<T>(
    operations: (tx: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    try {
      return await this.prisma.$transaction(operations, {
        maxWait: 5000, // 5 seconds
        timeout: 10000, // 10 seconds
      });
    } catch (error) {
      this.logger.error("Transaction failed:", error);
      throw error;
    }
  }

  // Direct Prisma access for simple operations
  get users() {
    return this.prisma.user;
  }

  get bids() {
    return this.prisma.bid;
  }

  get emails() {
    return this.prisma.email;
  }

  get contracts() {
    return this.prisma.contract;
  }

  // Raw Prisma client access
  get client() {
    return this.prisma;
  }

  // Utility methods for common operations
  async findUniqueWithTransaction<T>(
    model: keyof Prisma.TypeMap["model"],
    args: any
  ): Promise<T> {
    return await this.executeTransaction(async (tx) => {
      return await (tx as any)[model].findUnique(args);
    });
  }

  async findManyWithTransaction<T>(
    model: keyof Prisma.TypeMap["model"],
    args: any
  ): Promise<T[]> {
    return await this.executeTransaction(async (tx) => {
      return await (tx as any)[model].findMany(args);
    });
  }

  async createWithTransaction<T>(
    model: keyof Prisma.TypeMap["model"],
    args: any
  ): Promise<T> {
    return await this.executeTransaction(async (tx) => {
      return await (tx as any)[model].create(args);
    });
  }

  async updateWithTransaction<T>(
    model: keyof Prisma.TypeMap["model"],
    args: any
  ): Promise<T> {
    return await this.executeTransaction(async (tx) => {
      return await (tx as any)[model].update(args);
    });
  }

  async deleteWithTransaction<T>(
    model: keyof Prisma.TypeMap["model"],
    args: any
  ): Promise<T> {
    return await this.executeTransaction(async (tx) => {
      return await (tx as any)[model].delete(args);
    });
  }

  async upsertWithTransaction<T>(
    model: keyof Prisma.TypeMap["model"],
    args: any
  ): Promise<T> {
    return await this.executeTransaction(async (tx) => {
      return await (tx as any)[model].upsert(args);
    });
  }

  async countWithTransaction(
    model: keyof Prisma.TypeMap["model"],
    args?: any
  ): Promise<number> {
    return await this.executeTransaction(async (tx) => {
      return await (tx as any)[model].count(args);
    });
  }

  // Batch operations with transaction
  async batchOperations(
    operations: (tx: Prisma.TransactionClient) => Promise<any[]>
  ) {
    return await this.executeTransaction(async (tx) => {
      return await Promise.all(await operations(tx));
    });
  }

  // Raw query with transaction
  async rawQueryWithTransaction<T = any>(
    query: string,
    params?: any[]
  ): Promise<T> {
    return await this.executeTransaction(async (tx) => {
      return await tx.$queryRaw(Prisma.sql([query], ...(params || [])));
    });
  }

  // Raw execute with transaction
  async rawExecuteWithTransaction(
    query: string,
    params?: any[]
  ): Promise<number> {
    return await this.executeTransaction(async (tx) => {
      return await tx.$executeRaw(Prisma.sql([query], ...(params || [])));
    });
  }
}
