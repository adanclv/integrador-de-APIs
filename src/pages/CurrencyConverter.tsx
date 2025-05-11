import React, { useState } from "react";
import useCurrency from "../hooks/useCurrency";
import { FaExchangeAlt, FaMoneyBillWave } from "react-icons/fa";
import currencies from "../mocks/physical-currencies.json";
import { Header } from "../components/Header";

interface Physical_Currency {
  code: string;
  name: string;
}

const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<Physical_Currency>({ code: "USD", name: "United States Dollar" });
  const [toCurrency, setToCurrency] = useState<Physical_Currency>({ code: "MXN", name: "Mexican Peso" });
  const { exchange_data, loading, error, getCurrency } = useCurrency();
  const [darkMode, setDarkMode] = useState(false);
  const [amount, setAmount] = useState(1);

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
    <>
      <Header />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-100 to-green-200 text-gray-800'} p-6 flex flex-col items-center`}>
        <header className="flex justify-between items-center bg-white/80 backdrop-blur-md border border-green-200 rounded-xl px-6 py-4 shadow-md mb-8 w-full max-w-2xl">
          <div className="flex items-center gap-3 text-green-700 font-bold text-xl">
            <FaMoneyBillWave className="text-green-500 text-3xl" />
            Currency Exchange
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
          >
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </header>

        <div className="w-full max-w-2xl bg-white/80 rounded-3xl shadow-xl p-8 backdrop-blur-md border border-green-200 space-y-6">
          <h1 className="text-3xl font-bold text-green-700 flex items-center gap-3 justify-center">
            <FaExchangeAlt className="text-green-600" /> Conversor de Monedas
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">Cantidad</label>
              <input
                type="number"
                className="p-2 rounded border shadow-inner text-sm"
                value={amount}
                min={0}
                onChange={e => setAmount(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">De:</label>
              <select
                className="p-2 rounded border text-sm"
                value={fromCurrency.code}
                onChange={handleFromCurrency}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {`${currency.name} (${currency.code})`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">A:</label>
              <select
                className="p-2 rounded border text-sm"
                value={toCurrency.code}
                onChange={handleToCurrency}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {`${currency.name} (${currency.code})`}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleConvert}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Convert
            </button>
          </div>
          {error && (
            <p className="text-red-600 text-center mt-4">{error}</p>
          )}

          <div className="text-center mt-6">
            {loading ? (
              <p className="text-gray-500 animate-pulse">Consultando tasa...</p>
            ) : (
              <p className="text-2xl font-bold">
                {exchange_data && (
                  <>
                    <span className="text-green-600">{(amount * exchange_data.exchangeRate).toFixed(4)} {toCurrency.code}</span>
                    <p className="text-sm text-gray-500 mt-5">
                      Last updated: {new Date(exchange_data.lastRefreshed).toLocaleString()} ({exchange_data.timeZone})
                    </p>
                    <div className="flex justify-center gap-6 mt-2 text-gray-700">
                      <p>Bid: {exchange_data.bidPrice.toFixed(4)}</p>
                      <p>Ask: {exchange_data.askPrice.toFixed(4)}</p>
                    </div>

                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
