import { findDealById } from "../repositories/dealRepository.js";
import { createClaim, findClaimByUserAndDeal, findClaimsByUserId } from "../repositories/claimRepository.js";

export const claimDealService = async ({ user, dealId }) => {
  const deal = await findDealById(dealId);
  if (!deal) {
    throw { status: 404, message: "Deal not found" };
  }

  if (deal.isLocked && !user?.isVerified) {
    throw { status: 403, message: "This deal is locked. Verification required." };
  }

  const existing = await findClaimByUserAndDeal({ userId: user.id, dealId });
  if (existing) {
    throw { status: 409, message: "Deal already claimed" };
  }

  const claim = await createClaim({ userId: user.id, dealId });
  return claim;
};

export const getMyClaimsService = async ({ user }) => {
  return await findClaimsByUserId({ userId: user.id });
};

