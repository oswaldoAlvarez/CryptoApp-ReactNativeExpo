import { axiosInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export interface CoinGeckoExchangeTickersResponse {
  name: string;
  tickers: CoinGeckoTicker[];
}

export interface CoinGeckoTicker {
  base: string; // Cripto base (ej: BTC)
  target: string; // Cripto o fiat objetivo (ej: USDT)
  market: {
    name: string; // Nombre del exchange (ej: Binance)
    identifier: string; // Identificador interno (ej: binance)
    has_trading_incentive: boolean;
  };
  last: number; // Último precio
  volume: number; // Volumen 24h en ese par
  converted_last: {
    btc: number | null;
    eth: number | null;
    usd: number | null;
  };
  converted_volume: {
    btc: number | null;
    eth: number | null;
    usd: number | null;
  };
  trust_score: "green" | "yellow" | "red" | null;
  bid_ask_spread_percentage: number | null;
  timestamp: string | null; // Última actualización (ISO8601)
  last_traded_at: string | null; // Fecha último trade (ISO8601)
  last_fetch_at: string | null; // Fecha última consulta a la API (ISO8601)
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string | null; // URL directa al par en el exchange
  token_info_url: string | null; // URL a info del token (opcional)
  coin_id: string; // ID interno de la cripto base
  target_coin_id: string | null; // ID interno de la cripto objetivo (a veces null)
}

const fetchCoinGecko = async (): Promise<CoinGeckoExchangeTickersResponse> => {
  const url = "https://api.coingecko.com/api/v3/exchanges/binance/tickers";

  try {
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (err: any) {
    throw new Error(`Error al obtener datos de CoinGecko ${err}`);
  }
};

export const useCoinGeckoInfo = () => {
  const { data, isLoading, isError, error } = useQuery<
    CoinGeckoExchangeTickersResponse,
    Error
  >({
    queryKey: ["coingeckoMarkets"],
    queryFn: fetchCoinGecko,
  });

  return {
    data: data ?? { name: "", tickers: [] }, // default value: objeto con tickers vacío
    loading: isLoading,
    isError,
    error,
  };
};
