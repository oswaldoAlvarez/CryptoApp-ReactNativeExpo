import { useKlineChartData } from "@/hooks";
import React from "react";
import { CandlestickChart } from "react-native-wagmi-charts";
import { MainContainer } from "../mainContainer/MainContainer.component";

interface RealTimeCandleChartProps {
  symbol: string;
  interval?: string;
}

export const RealTimeCandleChart = React.memo(
  ({ symbol, interval }: RealTimeCandleChartProps) => {
    const { chartData } = useKlineChartData(symbol, interval);

    const formattedChartData = React.useMemo(
      () =>
        chartData.slice(-50).map((item) => ({
          timestamp: item.timestamp,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        })),
      [chartData]
    );

    return (
      <MainContainer>
        <CandlestickChart.Provider data={formattedChartData}>
          <CandlestickChart>
            <CandlestickChart.Candles rectProps={{ rx: 2 }} />
          </CandlestickChart>
        </CandlestickChart.Provider>
      </MainContainer>
    );
  }
);

RealTimeCandleChart.displayName = "RealTimeCandleChart";
