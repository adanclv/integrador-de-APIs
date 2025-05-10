export interface CurrencyData {
  fromCurrencyCode: string,
  fromCurrencyName: string,
  toCurrencyCode: string,
  toCurrencyName: string,
  exchangeRate: number,
  lastRefreshed: string,
  timeZone: string,
  bidPrice: number,
  askPrice: number
}
