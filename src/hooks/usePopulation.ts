import { useState } from "react";
import { type PopulationData } from "../types/population_data";
import { fetchPopulation } from "../services/population";

interface Props {
  data: PopulationData[];
  loading: boolean;
  error: string | null;
  getPopulationData: (countryCode: string) => void;
}

const usePopulation = (): Props => {
  const [data, setData] = useState<PopulationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getPopulationData = async (countryCode: string) => {
    if (!countryCode) return null;
    setLoading(true);
    setError(null);
    setData([]);
    
    try {
      const response = await fetchPopulation(countryCode);
      if (response) {
        setData(response);
      }
    } catch (e) {
      setError("Error al obtener los datos de población, " + e);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, getPopulationData };
};

export default usePopulation;
