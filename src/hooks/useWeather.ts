import initialWeather from "../mocks/weather-results.json"
import { type WeatherData as Weather} from "../types/weather_data";
import { type CityId } from "../types/city";
import { useCallback, useState } from "react";
import { fetchWeather } from "../services/weather";

interface Props {
    weather: Weather,
    getWeather: (id: CityId) => void;
}

export default function useWeather(id: CityId): Props {
    const [weather, setWeather] = useState<Weather>(initialWeather)
    console.log("DEbug" + id)

    const getWeather = useCallback(async (id: CityId) => {    
        try {
            const newWeather = await fetchWeather({ id })
            if (newWeather) {
                setWeather(newWeather)
            }
            console.log(newWeather)
        } catch (e) {
            throw new Error(`Error al buscar: ${e}`)
        }
    }, [])

    if (!weather) {
        getWeather(id);
    }

    return { weather, getWeather };
};
