export const formattedAmount = (amount: number) => {
  return `${amount.toFixed(2).replace(".", ",")}`;
};

export const formatLargeNumber = (n: number): string => {
  if (Math.abs(n) >= 1_000_000_000_000) {
    return (n / 1_000_000_000_000).toFixed(2).replace(/\.00$/, "") + "T";
  }
  if (Math.abs(n) >= 1_000_000_000) {
    return (n / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
  }
  if (Math.abs(n) >= 1_000_000) {
    return (n / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  }

  return n.toString();
};
