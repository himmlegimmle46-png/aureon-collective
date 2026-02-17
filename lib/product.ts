export const PRODUCT = {
  name: "Bee Swarm Account (Blue Hive)",
  priceLabel: "$60",
  priceValue: "60", // numeric string for query params
  description:
    "Blue Hive Bee Swarm Account. After ordering, join the Discord and open a ticket to continue.",
  images: ["/product-1.png", "/product-2.png"] as const,
  specs: [
    "Hive lvl: 16",
    "Bees: 50",
    "Guards: Endgame",
    "Mask: Diamond Mask",
    "Bag: Coconut Canister",
    "Tool: Petal Wand",
    "Belt: Petal Belt",
    "Star Amulet: SSA (Popstar)",
    "Honey: 10T+",
    "Full access to account (no email linked + password provided after purchase)",
  ] as const,
  discord: "https://discord.gg/knuz3yfWdU",
  discordShort: "discord.gg/knuz3yfWdU",
} as const;

// ✅ ONLY CHANGE THIS NUMBER
export const STOCK_COUNT = 4;

// ✅ Your rule: show "In Stock" only if more than 1
export const IN_STOCK = STOCK_COUNT > 1;

export function stockBadge() {
  const badgeClasses = IN_STOCK
    ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
    : "border-red-400/25 bg-red-400/10 text-red-200";

  const dotClass = IN_STOCK ? "bg-emerald-300" : "bg-red-300";
  const label = IN_STOCK ? `In Stock (${STOCK_COUNT})` : "Out of Stock";

  return { badgeClasses, dotClass, label };
}