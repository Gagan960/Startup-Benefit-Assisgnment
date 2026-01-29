import { getAllDealsService, getDealByIdService } from "../services/dealService.js";

export async function getAllDeals(req, res) {
  try {
    const { search, category, locked } = req.query;

    const lockedBool =
      locked === "true" ? true :
      locked === "false" ? false :
      undefined;

    const deals = await getAllDealsService({
      search: search ? String(search) : undefined,
      category: category ? String(category) : undefined,
      locked: lockedBool
    });

    return res.status(200).json({
      success: true,
      message: "Deals fetched successfully",
      data: deals
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

export async function getDealById(req, res) {
  try {
    const { id } = req.params;

    const deal = await getDealByIdService(id);
    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deal fetched successfully",
      data: deal
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

