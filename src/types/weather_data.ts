import { type Coord } from "./coord"

interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface Main {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
}

interface Wind {
    speed: number,
    deg: number
}

interface Clouds {
    all: number
}

export interface WeatherData {
    coord: Coord,
    weather: Weather[],
    main: Main,
    visibility: number,
    wind: Wind,
    clouds: Clouds,
    dt: number,
    id: number,
    name: string
}