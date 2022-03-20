export const hasCategoryArticles = (articles, categoryId) => {
    return !!(articles.find(article => article.post_category_id == categoryId));
}