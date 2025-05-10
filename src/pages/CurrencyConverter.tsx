import React, { useState } from "react";
import useCurrency from "../hooks/useCurrency";
import { FaExchangeAlt } from "react-icons/fa";
import currencies from "../mocks/physical-currencies.json";

interface Physical_Currency {
  code: string;
  name: string;
}

const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<Physical_Currency>({ code: "USD", name: "United States Dollar" });
  const [toCurrency, setToCurrency] = useState<Physical_Currency>({ code: "MXN", name: "Mexican Peso" });
  const { exchange_data, loading, error, getCurrency } = useCurrency();

  const handleConvert = () => {
    if (fromCurrency && toCurrency) {
      getCurrency(fromCurrency.code, toCurrency.code);
    }
  };

  const handleFromCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = currencies.find((currency) => currency.code === e.target.value);
    if (newCurrency) {
      setFromCurrency(newCurrency);
    }
  };

  const handleToCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = currencies.find((currency) => currency.code === e.target.value);
    if (newCurrency) {
      setToCurrency(newCurrency);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Currency Converter</h2>

      <div className="flex items-center justify-center gap-2 mb-4">
        <select
          value={fromCurrency.code}
          onChange={handleFromCurrency}
          className="p-2 bg-white text-black rounded-md border border-gray-300"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {`${currency.name} (${currency.code})`}
            </option>
          ))}
        </select>

        <FaExchangeAlt className="text-3xl text-gray-600 mx-2" />

        <select
          value={toCurrency.code}
          onChange={handleToCurrency}
          className="p-2 bg-white text-black rounded-md border border-gray-300"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {`${currency.name} (${currency.code})`}
            </option>
          ))}
        </select>

        <button
          onClick={handleConvert}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Convert
        </button>
      </div>

      {loading && (
        <p className="text-yellow-600 text-center mt-4">Loading exchange rate...</p>
      )}

      {error && (
        <p className="text-red-600 text-center mt-4">{error}</p>
      )}

      {exchange_data && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            {exchange_data.fromCurrencyName} ({exchange_data.fromCurrencyCode}) to {exchange_data.toCurrencyName} ({exchange_data.toCurrencyCode})
          </h3>
          <p className="text-4xl font-semibold text-green-600 my-4">
            {exchange_data.exchangeRate.toFixed(4)}
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(exchange_data.lastRefreshed).toLocaleString()} ({exchange_data.timeZone})
          </p>
          <div className="flex justify-center gap-6 mt-2 text-gray-700">
            <p>Bid: {exchange_data.bidPrice.toFixed(4)}</p>
            <p>Ask: {exchange_data.askPrice.toFixed(4)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
