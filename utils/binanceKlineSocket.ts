import { KlineData } from "@/types/socket.interfaces";

let klineSocket: WebSocket | null = null;
let currentSymbol: string = "";
let currentInterval: string = "";
let klineListeners: ((data: KlineData) => void)[] = [];

export const connectKlineSocket = (symbol: string, interval: string = "1m") => {
  if (!symbol) return;

  if (klineSocket && currentSymbol === symbol && currentInterval === interval) {
    return;
  }

  if (klineSocket) {
    klineSocket.close();
    klineSocket = null;
  }

  currentSymbol = symbol;
  currentInterval = interval;
  const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
  klineSocket = new WebSocket(wsUrl);

  klineSocket.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    if (msg.k) {
      const kline: KlineData = msg.k;
      klineListeners.forEach((listener) => listener(kline));
    }
  };
};

export const subscribeKline = (callback: (data: KlineData) => void) => {
  klineListeners.push(callback);
};

export const unsubscribeKline = (callback: (data: KlineData) => void) => {
  klineListeners = klineListeners.filter((cb) => cb !== callback);
};
