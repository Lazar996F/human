
export default async function handler(req, res) {
    const data = await fetch('https://www.alpha-orbital.com/last-100-news.json');
    const articles = await data.json();
    res.status(200).json(articles);
}