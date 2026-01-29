export type User = {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Deal = {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  partnerName: string;
  partnerWebsiteUrl?: string;
  logoUrl?: string;
  eligibility: string;
  redemptionInstructions: string;
  isLocked: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ClaimStatus = "pending" | "approved";

export type Claim = {
  _id: string;
  user: string;
  deal: Deal;
  status: ClaimStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: unknown;
};

