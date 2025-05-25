/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../api/apiConfig";
import axiosInstance from "../utils/axiosConfig";
import { Bid } from "../types/bidTypes";

export const BidService = {
  async fetchAllBids(): Promise<Bid[]> {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.BIDS.ALL);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to fetch bids");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async createBid(bidData: Omit<Bid, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bid> {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.BIDS.CREATE, bidData);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to create bid");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async updateBid(id: string, bidData: Partial<Bid>): Promise<Bid> {
    try {
      const response = await axiosInstance.patch(`${API_ENDPOINTS.BIDS.BASE}/${id}`, bidData);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to update bid");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async deleteBid(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`${API_ENDPOINTS.BIDS.BASE}/${id}`);
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to delete bid");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  }
};