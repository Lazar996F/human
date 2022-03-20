
export default async function handler({ query: {categoryId} }, res) {
    const data = await fetch('https://www.alpha-orbital.com/last-100-news.json');
    const articles = await data.json();

    const singleArticle = articles.filter(art => art.post_category_id === categoryId);

    if(singleArticle) {
        res.status(200).json(singleArticle);
    } else {
        res.status(404).json({message: `Article with id: ${categoryId} is not found`});
    }
}