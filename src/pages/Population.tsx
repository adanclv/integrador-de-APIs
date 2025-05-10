import React, { useEffect, useState } from "react";
import usePopulation from "../hooks/usePopulation";
import { PopulationChart } from "../components/PopulationChart";

const Population: React.FC = () => {
  const [countryCode, setCountryCode] = useState<string>("AFE");
  const { data, loading, error, getPopulationData } = usePopulation();

  useEffect(() => {
    getPopulationData(countryCode);
  }, []);

  const handleSearch = async () => {
    console.log("Buscando datos para el país:", countryCode);
    getPopulationData(countryCode);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Población Mundial</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Código de país (ej: AFE)"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>
      {loading && <p>Cargando datos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && data.length > 0 && <PopulationChart data={data} />}
    </div>
  );
};

export default Population;
