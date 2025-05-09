import useCities from "../hooks/useCities";
import useWeather from "../hooks/useWeather";
import { CardWeather } from "../components/CardWeather";
import { useEffect } from "react";

export const Home: React.FC = () => {
    const cities = useCities();
    const city = cities[0]
    const { weather, getWeather } = useWeather({ id: city.id })

    useEffect(() => {
        getWeather(city);
        console.log(city)
    }, [getWeather, city]);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Consulta del Clima</h1>
            
            
            {/* {loading && <p>Cargando...</p>}
            {weather && <WeatherCard weather={weather} />} */}

            <h2>Weather</h2>
            <CardWeather weather={weather} />
        </div>
    );
};
