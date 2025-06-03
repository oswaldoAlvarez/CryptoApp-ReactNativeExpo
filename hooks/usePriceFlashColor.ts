import { useEffect, useRef, useState } from "react";

export function usePriceFlashColor(
  price: number,
  baseColor: string = "",
  upColor: string = "#16C784",
  downColor: string = "#EA3943",
  duration: number = 200
) {
  const prevPrice = useRef(price);
  const [color, setColor] = useState<string>(baseColor);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (price > prevPrice.current) {
      setColor(upColor);
      timeoutRef.current = setTimeout(() => setColor(baseColor), duration);
    } else if (price < prevPrice.current) {
      setColor(downColor);
      timeoutRef.current = setTimeout(() => setColor(baseColor), duration);
    }
    prevPrice.current = price;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [price, baseColor, upColor, downColor, duration]);

  return color;
}
