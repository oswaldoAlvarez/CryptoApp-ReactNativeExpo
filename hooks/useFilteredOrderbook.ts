import { useCryptoStore } from "@/store/cryptoStore";
import { useMemo, useState } from "react";

export type OrderType = "all" | "name" | "price" | "volume";
export type OrderDirection = "asc" | "desc";

const ALLOWED_TARGETS = new Set([
  "USD",
  "USDT",
  "USDC",
  "BUSD",
  "DAI",
  "TUSD",
  "USDP",
  "USTC",
  "FDUSD",
]);

export const useFilteredOrderbook = () => {
  const tickers = useCryptoStore((s) => s.tickers);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<OrderType>("all");
  const [direction, setDirection] = useState<OrderDirection>("asc");

  const toggleOrder = (key: OrderType) => {
    if (order === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrder(key);
      setDirection("asc");
    }
  };

  const filteredTickers = useMemo(() => {
    let arr = tickers.filter((t) =>
      ALLOWED_TARGETS.has(t.target.toUpperCase())
    );

    if (search.trim().length > 0) {
      arr = arr.filter(
        (t) =>
          t.base.toLowerCase().includes(search.toLowerCase()) ||
          t.target.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (order === "name") {
      arr = arr
        .slice()
        .sort((a, b) =>
          direction === "asc"
            ? a.base.localeCompare(b.base)
            : b.base.localeCompare(a.base)
        );
    } else if (order === "price") {
      arr = arr
        .slice()
        .sort((a, b) =>
          direction === "asc" ? b.last - a.last : a.last - b.last
        );
    } else if (order === "volume") {
      arr = arr
        .slice()
        .sort((a, b) =>
          direction === "asc" ? b.volume - a.volume : a.volume - b.volume
        );
    }

    return arr;
  }, [search, order, direction, tickers]);

  const reset = () => {
    setSearch("");
    setOrder("all");
    setDirection("asc");
  };

  return {
    search,
    setSearch,
    order,
    direction,
    toggleOrder,
    filteredTickers,
    reset,
  };
};
