import useCities from "../hooks/useCities";
import useWeather from "../hooks/useWeather";
import { WeatherCard } from "../components/WeatherCard";
import { useEffect } from "react";
import { NewsCard } from "../components/NewsCard";
import useNews from "../hooks/useNews";

export const Home: React.FC = () => {
    const cities = useCities();
    const city = cities[0]
    const { weather, getWeather } = useWeather({ id: city.id })
    const { articles, getNews } = useNews();

    useEffect(() => {
        getWeather(city);
        getNews();

    }, []);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Consulta del Clima</h1>
            
            
            {/* {loading && <p>Cargando...</p>}
            {weather && <WeatherCard weather={weather} />} */}

            <h2>Weather</h2>
            <WeatherCard weather={weather} />
            <NewsCard article={articles[0]}/>
        </div>
    );
};
