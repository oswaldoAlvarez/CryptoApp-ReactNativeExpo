import { tickerEmitter } from "@/utils/tickerEmitter";
import { useEffect, useRef, useState } from "react";

export function useLiveTicker(
  symbol: string,
  initial: { price: number; volume: number }
) {
  const [state, setState] = useState(initial);
  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queuedRef = useRef<{ price: number; volume: number } | null>(null);

  useEffect(() => {
    function handler(data: { price: number; volume: number }) {
      queuedRef.current = data;

      if (!throttleRef.current) {
        throttleRef.current = setTimeout(() => {
          if (queuedRef.current) {
            setState(queuedRef.current);
            queuedRef.current = null;
          }
          throttleRef.current = null;
        }, 250);
      }
    }
    tickerEmitter.on(symbol, handler);
    return () => {
      tickerEmitter.off(symbol, handler);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
        throttleRef.current = null;
      }
    };
  }, [symbol]);

  return state;
}
