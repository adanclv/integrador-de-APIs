import { useEffect, useState } from "react";
import { NewsCard } from "../components/NewsCard";
import { Header } from "../components/Header";
import useNews from "../hooks/useNews";
import { FaNewspaper, FaSearch } from "react-icons/fa";

export const News: React.FC = () => {
    const { articles, getNews } = useNews();
    const [query, setQuery] = useState<string>("");
    const [darkMode, setDarkMode] = useState(false);

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
        <>
            <Header />
            <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen p-6`}>
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <FaNewspaper /> Noticias
                        </h1>
                        <button onClick={() => setDarkMode(!darkMode)} className="text-sm bg-yellow-200 px-3 py-1 rounded">
                            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 justify-center mt-5">
                    <div className="flex items-center gap-2 bg-white text-black rounded-xl px-4 py-2 shadow border w-full md:w-1/2">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Buscar tema..."
                            className="w-full outline-none text-sm bg-transparent"
                            value={query}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                    >
                        Buscar
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ml-40 mr-40">
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <NewsCard key={index} article={article} option={1} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No se encontraron noticias.</p>
                    )}
                </div>



            </div>
        </>
    );
}