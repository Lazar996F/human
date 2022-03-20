import fs from "fs";

export default async function handler(req, res) {
    const searchTerm = req.query.search;
    const deleteSlug = req.query.delete;
    const categoryId = req.query.categoryId;

    await fs.readFile('./pages/api/articlesData.json', 'utf-8',async (err,jsonString) => {
        if(err){
            console.log(">>ERROR>>>",err)
        } else {
            const articles = JSON.parse(jsonString);
            if(deleteSlug){
                const filteredArticles = articles.filter(article => article.slug !== deleteSlug);
                await fs.writeFile('./pages/api/articlesData.json', JSON.stringify(filteredArticles), err => {
                    if(err) {
                        console.log(">>ERROR>>",err);
                    }
                })
                res.status(200).json(filteredArticles);
            }
            if(searchTerm) {
                const filteredArticles = articles.filter(article => article.title.toUpperCase().includes(searchTerm.toUpperCase()));
                res.status(200).json(filteredArticles)
            } else {
                const articlesByCategory = articles.filter(art => art.post_category_id === categoryId);
                res.status(200).json(articlesByCategory);
            }
        }
    });
}