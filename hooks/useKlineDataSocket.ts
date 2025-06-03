// import { useEffect, useState } from "react";
// import { usePairsDataSocket } from "@/hooks/usePairsDataSocket";

// export interface OHLCV {
//   x: Date;
//   y: [number, number, number, number];
// }

// export const useKlineDataSocket = () => {
//   const { currentSelectedPair } = usePairsDataSocket();

//   const [series, setSeries] = useState<{ data: OHLCV[] }[]>([]);

//   useEffect(() => {
//     if (!currentSelectedPair || !currentSelectedPair.symbol) return;

//     const symbol = currentSelectedPair.symbol.replace("/", "");
//     const interval = "1m";
//     const limit = 100;
//     const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         const ohlcvData: OHLCV[] = data.map((k: string[]) => ({
//           x: new Date(k[0]),
//           y: [
//             parseFloat(k[1]),
//             parseFloat(k[2]),
//             parseFloat(k[3]),
//             parseFloat(k[4]),
//           ],
//         }));

//         setSeries([{ data: ohlcvData }]);
//       })
//       .catch((error) => {
//         console.error("Error fetching OHLCV data", error);
//       });
//   }, [currentSelectedPair]);

//   useEffect(() => {
//     if (!currentSelectedPair || !currentSelectedPair.symbol) return;

//     const symbol = currentSelectedPair.symbol.replace("/", "");
//     const interval = "1m";
//     const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
//     const ws = new WebSocket(wsUrl);

//     ws.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       if (msg.k) {
//         const kline = msg.k;
//         const newCandle: OHLCV = {
//           x: new Date(kline.t),
//           y: [
//             parseFloat(kline.o),
//             parseFloat(kline.h),
//             parseFloat(kline.l),
//             parseFloat(kline.c),
//           ],
//         };

//         setSeries((prevSeries) => {
//           if (!prevSeries.length) return prevSeries;
//           const prevData = prevSeries[0].data;
//           if (kline.x === false) {
//             const updatedData = [...prevData];
//             updatedData[updatedData.length - 1] = newCandle;
//             return [{ data: updatedData }];
//           } else {
//             return [{ data: [...prevData, newCandle] }];
//           }
//         });
//       }
//     };

//     return () => {
//       ws.close();
//     };
//   }, [currentSelectedPair]);

//   return { series };
// };
