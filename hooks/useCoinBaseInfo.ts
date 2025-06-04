import { axiosInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export interface CoinGeckoCoinData {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    market_cap: { [key: string]: number };
    current_price: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
  };
}

const fetchCoinData = async (coinId: string): Promise<CoinGeckoCoinData> => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
  const res = await axiosInstance.get(url);
  return res.data;
};

export const useCoinBaseInfo = (coinId: string | null) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coinBaseInfo", coinId],
    queryFn: () => {
      if (!coinId) throw new Error("coinId is required");
      return fetchCoinData(coinId);
    },
    enabled: !!coinId,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return {
    data: data ?? {
      name: "",
      image: {
        small: "https://cdn-icons-png.flaticon.com/512/5978/5978100.png",
      },
      market_data: {
        price_change_24h: "",
        price_change_percentage_24h: "",
        low_24h: { usd: "" },
        high_24h: { usd: "" },
        total_volume: { usd: "" },
      },
    },
    loading: isLoading,
    isError,
    error,
  };
};
