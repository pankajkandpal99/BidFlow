/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Bid {
  id: string;
  projectName: string;
  contractor: string;
  contractorId: string;
  status:
    | "DRAFT"
    | "PENDING"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED"
    | "AWARDED";
  value: number | null;
  dueDate: string | null;
  attachments: { name: string; url: string }[] | null;
  emailId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BidState {
  bids: Bid[];
  loading: boolean;
  error: string | null;
}

export interface Contract {
  id: string;
  title: string;
  description: string | null;
  bidId: string;
  status: "DRAFT" | "ACTIVE" | "COMPLETED" | "TERMINATED";
  terms: any;
  signedAt: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractState {
  contracts: Contract[];
  loading: boolean;
  error: string | null;
}
