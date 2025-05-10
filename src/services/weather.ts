import { type CityId } from "../types/city";
import { type WeatherData as Weather } from "../types/weather_data";

const WEATHER_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=sp&appid=${import.meta.env.VITE_WEATHER_API_KEY}&id=`;

export const fetchWeather = async ({ id }: { id: CityId}) => {
    if (!id.id) return null;
    try {
        const response = await fetch(WEATHER_ENDPOINT + id.id)
        const weather: Weather = await response.json()

        return weather
    } catch (e) {
        throw new Error(`Error fetching weather: ${e}`)
    }
}
