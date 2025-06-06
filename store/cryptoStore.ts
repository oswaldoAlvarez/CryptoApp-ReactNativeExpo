import { CoinGeckoTicker } from "@/hooks/useCoinGeckoInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CryptoState {
  tickers: CoinGeckoTicker[];
  favorites: string[];
  setTickers: (tickers: CoinGeckoTicker[]) => void;
  toggleFavorite: (symbol: string) => void;
  isFavorite: (symbol: string) => boolean;
  clearFavorites: () => void;
}

export const useCryptoStore = create<CryptoState>()(
  persist(
    (set, get) => ({
      tickers: [],
      favorites: [],
      setTickers: (tickers) => set({ tickers }),
      toggleFavorite: (symbol) => {
        const { favorites } = get();
        if (favorites.includes(symbol)) {
          set({ favorites: favorites.filter((s) => s !== symbol) });
        } else {
          set({ favorites: [...favorites, symbol] });
        }
      },
      isFavorite: (symbol) => {
        return get().favorites.includes(symbol);
      },
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "crypto-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);
