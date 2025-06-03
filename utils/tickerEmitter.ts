import EventEmitter from "events";

export const tickerEmitter = new EventEmitter();

const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

socket.onmessage = (event) => {
  try {
    const updates = JSON.parse(event.data);
    for (const u of updates) {
      const symbol = u.s;
      tickerEmitter.emit(symbol, { price: Number(u.c), volume: Number(u.v) });
    }
  } catch (err) {
    // Manejo opcional de error
  }
};
