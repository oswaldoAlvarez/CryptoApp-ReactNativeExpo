import { useCoinGeckoInfo } from "@/hooks/useCoinGeckoInfo";
import { useCryptoStore } from "@/store/cryptoStore";
import { useEffect } from "react";

export function useCoinGeckoToStore() {
  const { data, loading } = useCoinGeckoInfo();
  const setTickers = useCryptoStore((s) => s.setTickers);

  useEffect(() => {
    if (!loading && data.tickers?.length) {
      setTickers(data.tickers);
    }
    // SOLO depende de loading, data.tickers y setTickers
  }, [loading, data.tickers, setTickers]);
}

export interface BinanceTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol (ej: BTCUSDT)
  p: string; // Price change
  P: string; // Price change percent
  w: string; // Weighted average price
  c: string; // Last price
  Q: string; // Last quantity
  b: string; // Best bid price
  B: string; // Best bid qty
  a: string; // Best ask price
  A: string; // Best ask qty
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  O: number; // Statistics open time
  C: number; // Statistics close time
  F: number; // First trade ID
  L: number; // Last trade ID
  n: number; // Total number of trades
}

const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

let listeners: ((data: BinanceTicker) => void)[] = [];

socket.onmessage = (event) => {
  const dataArray = JSON.parse(event.data);
  if (Array.isArray(dataArray)) {
    dataArray.forEach((data: BinanceTicker) =>
      listeners.forEach((listener) => listener(data))
    );
  }
};

export const subscribe = (callback: (data: BinanceTicker) => void) => {
  listeners.push(callback);
};

export const unsubscribe = (callback: (data: BinanceTicker) => void) => {
  listeners = listeners.filter((cb) => cb !== callback);
};
