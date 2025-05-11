import { type CurrencyData as Currency } from "../types/currency_data"

interface Props {
    data: Currency
}

export const ExchangeRateCard: React.FC<Props> = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-72 border border-purple-100">
            <h3 className="text-xl font-bold text-purple-600 mb-2">💱 Divisa</h3>
            <p className="text-gray-700 text-sm">1 {data.fromCurrencyCode} = {data.exchangeRate.toFixed(4)} {data.toCurrencyCode}</p>
            <p className="text-xs text-gray-500 mt-1">Actualizado hace {new Date(data.lastRefreshed).toLocaleString()} ({data.timeZone})</p>
        </div>

        // <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-inner">
        //     <h3 className="text-xl font-bold text-gray-800 mb-2">Exchange Rate</h3>
        //     <p className="text-gray-700">
        //         <span className="font-medium">From:</span> {data.fromCurrencyName} ({data.fromCurrencyCode})
        //     </p>
        //     <p className="text-gray-700">
        //         <span className="font-medium">To:</span> {data.toCurrencyName} ({data.toCurrencyCode})
        //     </p>
        //     <p className="text-2xl font-semibold text-green-600 my-2">
        //         {data.exchangeRate.toFixed(4)}
        //     </p>
        //     <p className="text-sm text-gray-500">
        //         Last updated: {new Date(data.lastRefreshed).toLocaleString()} ({data.timeZone})
        //     </p>
        //     <div className="flex justify-between mt-2 text-gray-600">
        //         <p>Bid Price: {data.bidPrice.toFixed(4)}</p>
        //         <p>Ask Price: {data.askPrice.toFixed(4)}</p>
        //     </div>
        // </div>
    );
} 
