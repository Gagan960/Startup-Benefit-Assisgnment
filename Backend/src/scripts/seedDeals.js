import connectDB from "../config/dbconfig.js";
import { insertManyDeals } from "../repositories/dealRepository.js";

const deals = [
  {
    title: "6 months free on Notion AI",
    category: "Productivity",
    shortDescription: "Upgrade your docs and roadmap with AI-assisted writing and summaries.",
    description:
      "Get Notion AI included for 6 months for your core team. Build faster specs, summarize meeting notes, and keep your startup wiki up to date.",
    partnerName: "Notion",
    partnerWebsiteUrl: "https://www.notion.so/",
    logoUrl: "https://www.notion.so/front-static/logo-ios.png",
    eligibility:
      "Must be an early-stage startup (pre-Series A) with an active product and a company email domain.",
    redemptionInstructions:
      "Claim the deal, then wait for approval. After approval, you'll receive redemption instructions in your dashboard.",
    isLocked: true
  },
  {
    title: "30% off Stripe payments for 3 months",
    category: "Payments",
    shortDescription: "Reduce payment processing fees while you scale revenue.",
    description:
      "Receive a 30% discount on Stripe processing fees for the next 3 months to keep runway longer.",
    partnerName: "Stripe",
    partnerWebsiteUrl: "https://stripe.com/",
    logoUrl: "https://stripe.com/img/v3/home/twitter.png",
    eligibility:
      "Available to startups incorporated within the last 3 years. Subject to partner approval.",
    redemptionInstructions:
      "Claim the deal. If approved, we’ll provide a Stripe link to apply the promotion to your account.",
    isLocked: false
  },
  {
    title: "Free credits for PostHog (up to $1,000)",
    category: "Analytics",
    shortDescription: "Product analytics and session replay credits for your first milestones.",
    description:
      "Get up to $1,000 in credits to instrument your product, run experiments, and understand retention.",
    partnerName: "PostHog",
    partnerWebsiteUrl: "https://posthog.com/",
    logoUrl: "https://posthog.com/images/social-image.png",
    eligibility:
      "Must be a startup team building a product with fewer than 25 employees.",
    redemptionInstructions:
      "Claim the deal. After approval, you’ll receive a coupon code to add within your PostHog billing settings.",
    isLocked: true
  },
  {
    title: "1 year of Linear at 50% off",
    category: "Engineering",
    shortDescription: "Issue tracking that stays fast as your team grows.",
    description:
      "Move faster with Linear. Get 50% off for 12 months to standardize planning and execution.",
    partnerName: "Linear",
    partnerWebsiteUrl: "https://linear.app/",
    logoUrl: "https://linear.app/static/social-image.png",
    eligibility:
      "Available to startups with an active product and a team size under 50.",
    redemptionInstructions:
      "Claim the deal. If approved, you’ll receive an invite link that applies the discount to your workspace.",
    isLocked: false
  },
  {
    title: "AWS Activate credits (starting at $5,000)",
    category: "Cloud",
    shortDescription: "Cloud credits to run your product and experiments.",
    description:
      "Eligible startups can receive AWS credits to reduce infrastructure spend and accelerate iteration.",
    partnerName: "AWS Activate",
    partnerWebsiteUrl: "https://aws.amazon.com/activate/",
    logoUrl: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
    eligibility:
      "Verification required. Must be a qualifying startup and provide basic company information.",
    redemptionInstructions:
      "Claim the deal. After approval, we’ll share a redemption link and guidance for applying credits.",
    isLocked: true
  },
  {
    title: "50% off Intercom for 6 months",
    category: "Customer Support",
    shortDescription: "Live chat and onboarding at a startup-friendly price.",
    description:
      "Cut Intercom costs while you build support and lifecycle messaging from day one.",
    partnerName: "Intercom",
    partnerWebsiteUrl: "https://www.intercom.com/",
    logoUrl: "https://www.intercom.com/_next/static/media/intercom-social.6ad72037.png",
    eligibility:
      "Available to early-stage startups. Not valid for existing enterprise contracts.",
    redemptionInstructions:
      "Claim the deal. If approved, you’ll receive a discount code and activation steps.",
    isLocked: false
  }
];

async function main() {
  await connectDB();
  await insertManyDeals(deals);
  console.log(`Seeded ${deals.length} deals`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

