import { type WeatherData as Weather } from "../types/weather_data"
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

interface Props {
    weather: Weather
}

export const WeatherCard: React.FC<Props> = ({ weather }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-100 h-fit border border-blue-100">

            <div className="flex items-center justify-between">
                <div className="text-left">
                    <h3 className="text-xl font-bold text-blue-600">📍{weather.name}</h3>
                    <p className="text-gray-600">{weather.weather[0].main} - {weather.weather[0].description}</p>
                </div>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} className="w-20 h-20" />
            </div>

            <div className="flex justify-around mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <WiHumidity className="text-blue-400 text-2xl" />
                    <span>{weather.main.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                    <WiStrongWind className="text-blue-300 text-2xl" />
                    <span>{weather.wind.speed} km/h, {weather.wind.deg}°</span>
                </div>

                <div className="text-4xl font-bold text-blue-700 mt-4">{weather.main.temp}°C</div>
            </div>
            {/* 
            <h2 className="text-xl font-bold">{weather.name} {weather.main.temp}°C</h2>
            <p className="text-gray-600">Sensación Térmica: {weather.main.feels_like}°C</p>
            <p className="text-gray-600">Clima: {weather.weather[0].main} - {weather.weather[0].description}</p>
            <p className="text-gray-600">Viento: {weather.wind.speed} km/h, Dirección: {weather.wind.deg}°</p>
            <p className="text-gray-600">Humedad: {weather.main.humidity}%</p>
            <div className="flex items-center mt-2">
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} className="w-12 h-12" />
                <span className="ml-2">{weather.weather[0].description}</span>
            </div> */}
        </div>
    );
}
