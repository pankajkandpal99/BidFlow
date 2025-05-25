import { Bid, Contract, UserRole } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  username?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  bids: Bid[];
  contracts: Contract[];

  // Optional additional profile fields
  phoneNumber?: string | null;
  address?: string | null;
  profilePicture?: string | null;
}
