import useCities from "../hooks/useCities";
import useWeather from "../hooks/useWeather";
import { WeatherCard } from "../components/WeatherCard";
import { useEffect } from "react";
import { NewsCard } from "../components/NewsCard";
import useNews from "../hooks/useNews";
// import usePopulation from "../hooks/usePopulation";
// import { PopulationChart } from "../components/PopulationChart";
import { ExchangeRateCard } from "../components/ExchangeRateCard";
import useCurrency from "../hooks/useCurrency";
import { Link } from 'react-router-dom';
import { FaCloudSun, FaNewspaper, FaGlobeAmericas, FaMoneyBillWave } from 'react-icons/fa';

import { Header } from "../components/Header";

interface Physical_Currency {
    code: string,
    name: string,
}

export const Home: React.FC = () => {
    const cities = useCities();
    const city = cities[0]
    const fromCurrency = { code: "USD", name: "United States Dollar" } as Physical_Currency;
    const toCurrency = { code: "MXN", name: "Mexican Peso" } as Physical_Currency;
    const { weather, getWeather } = useWeather({ id: city.id })
    const { articles, getNews } = useNews();
    // const { data, getPopulationData } = usePopulation();
    const { exchange_data, getCurrency } = useCurrency();


    useEffect(() => {
        getWeather(city);
        getNews();
        // getPopulationData(city.country);
        getCurrency(fromCurrency.code, toCurrency.code);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white text-gray-800 font-sans">
            <Header />

            <main className="text-center py-20 px-4">
                <h2 className="text-5xl font-extrabold mb-4 leading-tight text-blue-700">
                    Bienvenido al Integrador de APIs
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
                    Explora información actualizada sobre el clima, noticias, población mundial y tasas de cambio. Todo en una sola plataforma
                </p>
            </main>

            <div className="flex flex-wrap justify-center gap-4">
                <Link to="/weather" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow-md transition flex items-center gap-2">
                    <FaCloudSun /> Ver Clima
                </Link>
                <Link to="/news" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl text-lg shadow-md transition flex items-center gap-2">
                    <FaNewspaper /> Ver Noticias
                </Link>
                <Link to="/pop" className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl text-lg shadow-md transition flex items-center gap-2">
                    <FaGlobeAmericas /> Ver Población
                </Link>
                <Link to="/currency" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg shadow-md transition flex items-center gap-2">
                    <FaMoneyBillWave /> Ver Divisas
                </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 mb-12 mt-10">
                <WeatherCard weather={weather} />
                <NewsCard article={articles[0]} option={0}/>
                {exchange_data && <ExchangeRateCard data={exchange_data} />}
            </div>

        </div>

        // <div className="p-6 space-y-4">
        //     <h1 className="text-2xl font-bold">Consulta del Clima</h1>


        //     {/* {loading && <p>Cargando...</p>}
        //     {weather && <WeatherCard weather={weather} />} */}

        //     <h2>Weather</h2>
        //     <WeatherCard weather={weather} />
        //     <NewsCard article={articles[0]}/>
        //     <PopulationChart data={data} />
        //     {exchange_data && <ExchangeRateCard data={exchange_data} />}
        // </div>
    );
};
