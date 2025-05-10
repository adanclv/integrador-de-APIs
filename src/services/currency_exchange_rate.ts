import { type CurrencyData as Currency } from "../types/currency_data";
import exchange from "../mocks/exchange-response.json"

const ENDPOINT_CURRENCY_EXCHANGE_RATE = (from: string, to: string) => `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${import.meta.env.VITE_CURRENCY_EXCHANGE_API_KEY}`; 

export const fetchCurrency = async (from: string, to: string) => {
  try {
    // const response = await fetch(ENDPOINT_CURRENCY_EXCHANGE_RATE(from, to));
    // const result = await response.json();
    const result = exchange; // Mocked response for testing
    const data = result["Realtime Currency Exchange Rate"];

    if (!data) {
      throw new Error("Invalid response format");
    }

    const currencyData: Currency = {
      fromCurrencyCode: data["1. From_Currency Code"],
      fromCurrencyName: data["2. From_Currency Name"],
      toCurrencyCode: data["3. To_Currency Code"],
      toCurrencyName: data["4. To_Currency Name"],
      exchangeRate: parseFloat(data["5. Exchange Rate"]),
      lastRefreshed: data["6. Last Refreshed"],
      timeZone: data["7. Time Zone"],
      bidPrice: parseFloat(data["8. Bid Price"]),
      askPrice: parseFloat(data["9. Ask Price"]),
    };

    return currencyData;
  } catch (error) {
    throw new Error("Error fetching currency data: " + error);
  }
};
