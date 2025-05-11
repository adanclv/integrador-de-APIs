import { type Article } from "../types/news_article";

interface Props {
    article: Article,
    option: number
}

export const NewsCard: React.FC<Props> = ({ article, option = 0 }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    };

    return (
        <div className={`bg-white rounded-2xl shadow-lg p-6 ${option === 0 ? "w-[300px]" : "w-auto"} h-fit border border-yellow-100`}>
            <h3 className="text-xl font-bold text-yellow-600 mb-2">{article.title}</h3>
            {option === 1 &&
                <img
                    className="w-full h-60 object-cover"
                    src={article.urlToImage}
                    alt={article.title}
                />
            }
            <p className="text-gray-700 text-sm">{article.description}</p>
            <p className="text-right text-xs mt-5 mb-2 text-gray-500">Por {article.author} - {article.source.name}</p>
            {option === 1 &&
                <p className="text-gray-500 text-xs mb-2">{formatDate(article.publishedAt)}</p>
            }
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-yellow-600 text-white text-center py-2 px-4 rounded hover:bg-yellow-700 transition"
            >
                Leer más
            </a>
        </div>

        // <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
        //     <img 
        //         className="w-full h-48 object-cover" 
        //         src={article.urlToImage} 
        //         alt={article.title} 
        //     />
        //     <div className="p-4">
        //         <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
        //         <p className="text-gray-600 text-sm">Por {article.author} - {article.source.name}</p>
        //         <p className="text-gray-500 text-xs mb-2">{formatDate(article.publishedAt)}</p>
        //         <p className="text-gray-700 mb-4">{article.description}</p>
        //         <a 
        //             href={article.url} 
        //             target="_blank" 
        //             rel="noopener noreferrer"
        //             className="block bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition"
        //         >
        //             Leer más
        //         </a>
        //     </div>
        // </div>
    );
};
