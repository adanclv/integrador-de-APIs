import { type WeatherData as Weather } from "../types/weather_data"

interface Props {
    weather: Weather,
    onClick?: () => void
}

export const WeatherCard: React.FC<Props> = ({ weather, onClick }) => {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-md w-80 transform transition duration-300 hover:scale-105">
            <h2 className="text-xl font-bold">{weather.name} {weather.main.temp}°C</h2>
            <p className="text-gray-600">Sensación Térmica: {weather.main.feels_like}°C</p>
            <p className="text-gray-600">Clima: {weather.weather[0].main} - {weather.weather[0].description}</p>
            <p className="text-gray-600">Viento: {weather.wind.speed} km/h, Dirección: {weather.wind.deg}°</p>
            <p className="text-gray-600">Humedad: {weather.main.humidity}%</p>
            <div className="flex items-center mt-2">
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} className="w-12 h-12" />
                <span className="ml-2">{weather.weather[0].description}</span>
            </div>
        </div>
    );
}