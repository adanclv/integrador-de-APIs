import { type Article } from "../types/news_article";

const ENDPOINT_NEWS_TOP_HEADLINES = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}&pageSize=10`;
const ENDPOINT_NEWS_EVERYTHING = `https://newsapi.org/v2/everything?apiKey=${import.meta.env.VITE_NEWS_API_KEY}&pageSize=10&q=`;

interface Search {
    q?: string | null;
}

export const fetchNews = async ({ q }: Search) => {
    const endpoint = q ? ENDPOINT_NEWS_EVERYTHING + q : ENDPOINT_NEWS_TOP_HEADLINES;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error fetching news: ${data.message}`);
        }
        
        const articles: Article[] = data.articles

        return articles;
    } catch (e) {
        throw new Error(`Error fetching news: ${e}`);
    }
}