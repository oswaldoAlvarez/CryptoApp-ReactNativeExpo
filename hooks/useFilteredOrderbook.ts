import { useCryptoStore } from "@/store/cryptoStore";
import { useMemo, useState } from "react";

export type OrderType = "all" | "name" | "price";
export type OrderDirection = "asc" | "desc";

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
    let arr = tickers;

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
