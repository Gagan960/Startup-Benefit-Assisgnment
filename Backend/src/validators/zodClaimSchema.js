import { z } from "zod";

export const zodClaimSchema = z.object({
  dealId: z.string().min(1, "dealId is required")
});

