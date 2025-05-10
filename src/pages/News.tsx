import { useEffect, useState } from "react";
import { NewsCard } from "../components/NewsCard";
import useNews from "../hooks/useNews";

export const News: React.FC = () => {
    const { articles, getNews } = useNews();
    const [query, setQuery] = useState<string>("");
    
    useEffect(() => {
        getNews()
    }, [])

    const handleSearch = async () => {
        getNews(query);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Consulta de Noticias</h1>

            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="Buscar noticias..."
                    value={query}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Buscar
                </button>
            </div>

            <h2>Noticias</h2>
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </div>
            ) : (
                <p>No se encontraron noticias.</p>
            )}
        </div>
    );
}