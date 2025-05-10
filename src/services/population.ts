import { type PopulationData } from "../types/population_data";

const POPULATION_ENDPOINT = (countryCode: string) => 
  `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`;

export const fetchPopulation = async (countryCode: string) => {
    if (!countryCode) return null;
    try {
        const response = await fetch(POPULATION_ENDPOINT(countryCode));
        const result = await response.json();
        if (!Array.isArray(result) || result.length < 2) {
            throw new Error("Invalid response from World Bank API");
        }

        // The first element is metadata, the second element is the actual data
        if (!Array.isArray(result[1])) {
            throw new Error("Invalid data format from World Bank API");
        }
      
        const populationData: PopulationData[] = result[1]
        return populationData;
    } catch (e) {
        throw new Error(`Error fetching population data: ${e}`);
    }
}

