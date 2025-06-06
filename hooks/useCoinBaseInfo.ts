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
    market_cap: Record<string, number>;
    current_price: Record<string, number>;
    high_24h: Record<string, number>;
    low_24h: Record<string, number>;
    price_change_24h: number;
    price_change_percentage_24h: number;
    total_volume: Record<string, number>;
  };
}

const emptyData = {
  name: "",
  image: {
    small: "https://cdn-icons-png.flaticon.com/512/5978/5978100.png",
  },
  market_data: {
    price_change_24h: 0,
    price_change_percentage_24h: 0,
    low_24h: { usd: "" },
    high_24h: { usd: "" },
    total_volume: { usd: "" },
  },
};

const fetchCoinData = async (coinId: string): Promise<CoinGeckoCoinData> => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
  const res = await axiosInstance.get(url);
  return res.data;
};

export const useCoinBaseInfo = (coinId: string | null) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
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
    data: data ?? emptyData,
    loading: isLoading,
    isError,
    error,
    refetch,
  };
};
