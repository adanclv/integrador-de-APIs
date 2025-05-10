import { useState } from "react";
import { type CurrencyData as Currency } from "../types/currency_data";
import { fetchCurrency } from "../services/currency_exchange_rate";

interface Props {
  exchange_data: Currency | null;
  loading: boolean;
  error: string | null;
  getCurrency: (from: string, to: string) => void;
}

const useCurrency = (): Props => {
  const [exchange_data, setExchangeData] = useState<Currency | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrency = async (from: string, to: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchCurrency(from, to);
      setExchangeData(result);
    } catch (e) {
      setError("Error al obtener datos de divisas: " + e);
    } finally {
      setLoading(false);
    }
  };

  return { exchange_data, loading, error, getCurrency };
};

export default useCurrency;
