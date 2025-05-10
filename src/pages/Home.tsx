import useCities from "../hooks/useCities";
import useWeather from "../hooks/useWeather";
import { WeatherCard } from "../components/WeatherCard";
import { useEffect } from "react";
import { NewsCard } from "../components/NewsCard";
import useNews from "../hooks/useNews";
import usePopulation from "../hooks/usePopulation";
import { PopulationChart } from "../components/PopulationChart";
import { ExchangeRateCard } from "../components/ExchangeRateCard";
import useCurrency from "../hooks/useCurrency";

interface Physical_Currency {
  code: string,
  name: string,
}

export const Home: React.FC = () => {
    const cities = useCities();
    const city = cities[0]
    const fromCurrency= { code: "USD", name: "United States Dollar" } as Physical_Currency;
    const toCurrency = { code: "MXN", name: "Mexican Peso" } as Physical_Currency;
    const { weather, getWeather } = useWeather({ id: city.id })
    const { articles, getNews } = useNews();
    const { data, getPopulationData } = usePopulation();
    const { exchange_data, getCurrency } = useCurrency();


    useEffect(() => {
        getWeather(city);
        getNews();
        getPopulationData(city.country);
        getCurrency(fromCurrency.code, toCurrency.code);
    }, []);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Consulta del Clima</h1>
            
            
            {/* {loading && <p>Cargando...</p>}
            {weather && <WeatherCard weather={weather} />} */}

            <h2>Weather</h2>
            <WeatherCard weather={weather} />
            <NewsCard article={articles[0]}/>
            <PopulationChart data={data} />
            {exchange_data && <ExchangeRateCard data={exchange_data} />}
        </div>
    );
};
