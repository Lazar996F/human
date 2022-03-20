
export default async function handler({ query: {id} }, res) {
    const data = await fetch('https://www.alpha-orbital.com/last-100-news.json');
    const articles = await data.json();

    const singleArticle = articles.find(art => art.slug === id);

    if(singleArticle) {
        res.status(200).json(singleArticle);
    } else {
        res.status(404).json({message: `Article with id: ${req.query.id} is not found`});
    }
}