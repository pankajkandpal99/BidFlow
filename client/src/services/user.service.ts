import { API_ENDPOINTS } from "../api/apiConfig";
import axiosInstance from "../utils/axiosConfig";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const UserService = {
  async getCurrentUser() {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.USER.CURRENT_USER);
      console.log("UserService.getCurrentUser response:", response);
      return response.data;
    } catch (error: any) {
      console.error("UserService.getCurrentUser error:", error);
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to fetch user details");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
