import React, { useEffect, useState } from "react";
import useWeather from "../hooks/useWeather";
import useCities from "../hooks/useCities";
import { type City } from "../types/city";

export const WeatherDetail: React.FC = () => {
    const cities = useCities();
    const city = cities[0]
    const [selectedCity, setSelectedCity] = useState<City>(city)
    const { weather, getWeather } = useWeather({ id: selectedCity.id })
    
    useEffect(() => {
        getWeather(selectedCity);
    }, []);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = Number(event.target.value)
        const city = cities.find((c) => cityId === c.id)
        if (city) setSelectedCity(city)
    }

    const handleOnClick = () => {
        getWeather(selectedCity)
        console.log(selectedCity)
    }

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
            {/* Header con título y selector de ciudad */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">Clima Actual</h1>
                <div className="flex items-center space-x-4">
                    <select
                        value={selectedCity.id}
                        onChange={handleCityChange}
                        className="p-2 bg-white text-black rounded-md"
                    >
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleOnClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Consultar
                    </button>
                </div>
            </header>

            {/* Información del clima */}
            <div className="bg-slate-400 bg-opacity-20 rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {weather?.weather[0].icon && (
                            <img
                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                                alt={weather?.weather[0].description}
                                className="w-20 h-20"
                            />
                        )}
                        <div>
                            <p className="text-7xl font-bold">{weather?.main.temp}°</p>
                            <p className="text-lg">{weather?.weather[0].description}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-semibold">Sensación Termica: {weather?.main.feels_like}°</p>
                        <p className="text-lg">Humedad: {weather?.main.humidity}%</p>
                    </div>
                </div>

                {/* Información dividida en dos columnas */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                        <div className="flex justify-between border-b pb-1">
                            <span>🌬️ Viento</span>
                            <span>{weather?.wind.speed} km/h - {weather?.wind.deg}°</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <span>⬇️ Temperatura minima</span>
                            <span>{weather?.main.temp_min}°C</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <span>⬆️ Temperatura maxima</span>
                            <span>{weather?.main.temp_max}°C</span>
                        </div>
                        <div className="flex justify-between">
                            <span>☁️ Nubosidad</span>
                            <span>{weather?.clouds.all}%</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {/* <div className="flex justify-between border-b pb-1">
                            <span>💨 Ráfagas</span>
                            <span>{weather?.wind.gust ?? "N/A"} km/h</span>
                        </div> */}
                        <div className="flex justify-between border-b pb-1">
                            <span>💦 Humedad</span>
                            <span>{weather?.main.humidity}%</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                            <span>🌫️ Visibilidad</span>
                            <span>{(weather?.visibility / 1000).toFixed(1)} km</span>
                        </div>
                        <div className="flex justify-between">
                            <span>☁️ Techo de nubes</span>
                            <span>{weather?.main.grnd_level ?? "N/A"} m</span>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-300 mt-4">
                    Última actualización: {weather ? formatDate(weather.dt) : "N/A"}
                </p>
            </div>
        </div>
    );
}
