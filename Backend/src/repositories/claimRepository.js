import Claim from "../Schema/claim.js";

export const createClaim = async ({ userId, dealId }) => {
  return await Claim.create({ user: userId, deal: dealId });
};

export const findClaimByUserAndDeal = async ({ userId, dealId }) => {
  return await Claim.findOne({ user: userId, deal: dealId });
};

export const findClaimsByUserId = async ({ userId }) => {
  return await Claim.find({ user: userId })
    .populate("deal")
    .sort({ createdAt: -1 });
};

