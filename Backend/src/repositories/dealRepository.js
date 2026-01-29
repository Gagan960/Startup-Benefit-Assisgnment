import Deal from "../Schema/deal.js";

export const findDeals = async ({ search, category, locked }) => {
  const query = {};

  if (typeof locked === "boolean") {
    query.isLocked = locked;
  }

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { partnerName: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } }
    ];
  }

  return await Deal.find(query).sort({ createdAt: -1 });
};

export const findDealById = async (id) => {
  return await Deal.findById(id);
};

export const insertManyDeals = async (deals) => {
  return await Deal.insertMany(deals);
};

