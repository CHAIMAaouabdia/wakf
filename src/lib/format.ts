export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(n) + " دج";

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("ar-EG").format(n);

export const pct = (raised: number, goal: number) =>
  Math.min(100, Math.round((raised / goal) * 100));
