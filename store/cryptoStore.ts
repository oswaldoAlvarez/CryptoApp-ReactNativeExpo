import { CoinGeckoTicker } from "@/hooks/useCoinGeckoInfo";
import { create } from "zustand";

interface CryptoState {
  tickers: CoinGeckoTicker[];
  setTickers: (tickers: CoinGeckoTicker[]) => void;
  selectedCrypto: CoinGeckoTicker | null;
  setSelectedCrypto: (crypto: CoinGeckoTicker) => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  tickers: [],
  setTickers: (tickers) => set({ tickers }),
  selectedCrypto: null,
  setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }),
}));
