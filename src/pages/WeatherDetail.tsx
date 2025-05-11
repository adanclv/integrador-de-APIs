import React, { useEffect, useState } from "react";
import useWeather from "../hooks/useWeather";
import useCities from "../hooks/useCities";
import { type City } from "../types/city";
import { Header } from "../components/Header";
import { WiDaySunny, WiHumidity, WiStrongWind, WiThermometerExterior, WiThermometer, WiHorizonAlt, WiCloud } from 'react-icons/wi';
import { FaSearch } from 'react-icons/fa';

export const WeatherDetail: React.FC = () => {
    const cities = useCities();
    const city = cities[0]
    const [selectedCity, setSelectedCity] = useState<City>(city)
    const { weather, getWeather } = useWeather({ id: selectedCity.id })
    const [darkMode, setDarkMode] = useState(false);

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
        <>
            <Header />
            <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800'} p-6 flex flex-col items-center`}>

                <header className="flex justify-between items-center bg-white/80 backdrop-blur-md border border-blue-200 rounded-xl px-6 py-4 shadow-md mb-8 w-full max-w-2xl">
                    <div className="flex items-center gap-3 text-blue-700 font-bold text-xl">
                        <WiDaySunny className="text-yellow-400 text-3xl" />
                        Weather App
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                        {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
                    </button>
                </header>

                <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md border border-blue-200 rounded-3xl shadow-xl p-8 space-y-6">
                    <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-3 justify-center">
                        <WiDaySunny className="text-yellow-400" /> Clima en tiempo real
                    </h1>


                    <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2 shadow-inner border gap-2">
                        <FaSearch className="text-gray-500" />
                        <select
                            value={selectedCity.id}
                            onChange={handleCityChange}
                            className="p-2 bg-transparent text-black rounded-md w-full"
                        >
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleOnClick}
                            className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full hover:bg-blue-600 transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Buscar
                        </button>
                    </div>
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-blue-800">{weather.name}</h2>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                            alt={weather?.weather[0].description}
                            className="mx-auto drop-shadow-md"
                        />
                        <p className="text-lg capitalize text-gray-700">{weather.weather[0].description}</p>
                        <p className="text-5xl font-extrabold text-blue-900">{Math.round(weather.main.temp)}°C</p>
                        <div className="flex justify-around pt-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <WiHumidity className="text-xl" /> {weather.main.humidity}% Hum.
                            </div>
                            <div className="flex items-center gap-2">
                                <WiStrongWind className="text-xl" /> {weather.wind.speed} m/s Viento
                            </div>
                            <div className="flex items-center gap-2">
                                <WiThermometerExterior className="text-xl" /> {weather.main.temp_min}°C
                            </div>
                            <div className="flex items-center gap-2">
                                <WiThermometer className="text-xl" /> {weather.main.temp_max}°C
                            </div>
                        </div>

                        <div className="flex justify-around pt-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <WiHorizonAlt className="text-xl" /> {(weather?.visibility / 1000).toFixed(1)} km Visibilidad
                            </div>
                            <div className="flex items-center gap-2">
                                <WiCloud className="text-xl" /> {weather?.clouds.all}% Nubosidad
                            </div>
                        </div>

                        <p className="text-sm text-gray-300 mt-4">
                            Última actualización: {weather ? formatDate(weather.dt) : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
