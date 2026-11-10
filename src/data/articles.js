import { technologyArticles } from './technologyArticles.js';

export const categories = ['All articles', ...new Set(technologyArticles.map((article) => article.category))];
export const articles = technologyArticles;
