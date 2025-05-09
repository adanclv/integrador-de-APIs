import { type Coord } from "./coord"

export interface City {
    id: number,
    name: string,
    state: string,
    country: string,
    coord: Coord
}

export type Cities = Array<City>
export type CityId = Pick<City, 'id'>
export type CityName = Pick<City, 'name'>
