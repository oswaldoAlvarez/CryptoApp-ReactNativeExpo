export interface BinanceTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; // Last price
  p: string; // Price change
  P: string; // Price change percent
  w: string; // Weighted average price
  x: string; // Previous day's close price
  Q: string; // Last quantity
  b: string; // Best bid price
  B: string; // Best bid quantity
  a: string; // Best ask price
  A: string; // Best ask quantity
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Volume
  q: string; // Quote asset volume
  O: number; // Open time
  C: number; // Close time
  F: number; // First trade ID
  L: number; // Last trade ID
  n: number; // Total number of trades
}

export interface KlineData {
  t: number; // Tiempo de apertura
  T: number; // Tiempo de cierre
  s: string; // Símbolo
  i: string; // Intervalo
  f: number; // ID de la primera trade
  L: number; // ID de la última trade
  o: string; // Precio de apertura
  h: string; // Precio máximo
  l: string; // Precio mínimo
  c: string; // Precio de cierre
  v: string; // Volumen
  n: number; // Número de trades
  x: boolean; // ¿La vela se ha cerrado?
  q: string; // Volumen en moneda cotizada
  V: string; // Volumen de la vela (no siempre presente)
  Q: string; // Volumen de la vela en moneda cotizada (no siempre presente)
  B: string; // Información adicional (opcional)
}
