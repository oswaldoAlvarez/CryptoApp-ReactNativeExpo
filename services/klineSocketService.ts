import { KlineData } from "@/types/socket.interfaces";
import { EventEmitter } from "events";

type Listener = (data: KlineData) => void;

export const createKlineSocket = () => {
  let socket: WebSocket | null = null;
  let currentSymbol = "";
  let currentInterval = "";
  const emitter = new EventEmitter();

  const connect = (symbol: string, interval: string = "1m") => {
    if (socket && currentSymbol === symbol && currentInterval === interval)
      return;

    if (socket) {
      socket.close();
      socket = null;
    }

    currentSymbol = symbol;
    currentInterval = interval;

    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
    socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.k) {
        emitter.emit("kline", msg.k);
      }
    };

    socket.onerror = (e) => console.error("WebSocket error", e);
    socket.onclose = () => console.log("WebSocket disconnected");
  };

  const subscribe = (listener: Listener) => {
    emitter.on("kline", listener);
  };

  const unsubscribe = (listener: Listener) => {
    emitter.off("kline", listener);
  };

  return { connect, subscribe, unsubscribe };
};

export const klineSocketService = createKlineSocket();
