import { findDealById, findDeals } from "../repositories/dealRepository.js";

export const getAllDealsService = async (query) => {
  return await findDeals(query);
};

export const getDealByIdService = async (id) => {
  return await findDealById(id);
};

