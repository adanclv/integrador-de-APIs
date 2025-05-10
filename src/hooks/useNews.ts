import { useState } from "react";
import { type Article } from "../types/news_article";
import { fetchNews } from "../services/news";
import initialArticles from "../mocks/news-response.json";

interface Props {
    articles: Article[],
    getNews: (q?: string) => void;
}

const useNews = (): Props => {
    const [articles, setArticles] = useState<Article[]>(() => initialArticles.articles as Article[]);

    const getNews = async (q?: string) => {
        try {
            const newArticles = await fetchNews({ q })
            if (newArticles) {
                setArticles(newArticles)
            }
        } catch (e) {
            throw new Error(`Error al buscar: ${e}`)
        }
    }
    return { articles, getNews };
}

export default useNews;
