import { klineSocketService } from "@/services/klineSocketService";
import { useEffect, useState } from "react";

export interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const useKlineChartData = (symbol: string, initialInterval = "1m") => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (!symbol) return;

    const fetchHistoricalData = async () => {
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${initialInterval}&limit=100`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const formattedData: ChartData[] = data.map((k: any) => ({
          timestamp: k[0],
          open: parseFloat(k[1]),
          high: parseFloat(k[2]),
          low: parseFloat(k[3]),
          close: parseFloat(k[4]),
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching historical data", error);
      }
    };

    fetchHistoricalData();
    klineSocketService.connect(symbol, initialInterval);

    const listener = (kline: any) => {
      const newCandle: ChartData = {
        timestamp: kline.t,
        open: parseFloat(kline.o),
        high: parseFloat(kline.h),
        low: parseFloat(kline.l),
        close: parseFloat(kline.c),
      };

      setChartData((prevData) => {
        if (!kline.x) {
          const updatedData = [...prevData];
          updatedData[updatedData.length - 1] = newCandle;
          return updatedData;
        } else {
          return [...prevData, newCandle].slice(-100);
        }
      });
    };

    klineSocketService.subscribe(listener);

    return () => {
      klineSocketService.unsubscribe(listener);
    };
  }, [symbol, initialInterval]);

  return { chartData };
};
