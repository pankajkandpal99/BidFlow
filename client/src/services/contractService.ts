/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../api/apiConfig";
import { Contract } from "../types/bidTypes";
import axiosInstance from "../utils/axiosConfig";

export const ContractService = {
  async fetchAllContracts(): Promise<Contract[]> {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CONTRACTS.ALL);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to fetch contracts");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async createContract(contractData: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contract> {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CONTRACTS.CREATE, contractData);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to create contract");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async updateContract(id: string, contractData: Partial<Contract>): Promise<Contract> {
    try {
      const response = await axiosInstance.patch(`${API_ENDPOINTS.CONTRACTS.BASE}/${id}`, contractData);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to update contract");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async deleteContract(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`${API_ENDPOINTS.CONTRACTS.BASE}/${id}`);
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to delete contract");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  }
};