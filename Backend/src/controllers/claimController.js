import { claimDealService, getMyClaimsService } from "../services/claimService.js";

export async function claimDeal(req, res) {
  try {
    const { dealId } = req.body;

    const claim = await claimDealService({ user: req.user, dealId });

    return res.status(201).json({
      success: true,
      message: "Deal claimed successfully",
      data: claim
    });
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

export async function getMyClaims(req, res) {
  try {
    const claims = await getMyClaimsService({ user: req.user });

    return res.status(200).json({
      success: true,
      message: "Claims fetched successfully",
      data: claims
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

