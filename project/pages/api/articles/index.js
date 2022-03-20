const fs = require('fs');

export default async function handler(req, res) {
    const searchTerm = req.query.search;
    if(req.query.restore === '1') {
        const data = await fetch('https://www.alpha-orbital.com/last-100-news.json');
        const articlesResponse = await data.json();
        await fs.writeFile('./pages/api/articlesData.json', JSON.stringify(articlesResponse), err => {
            if(err) {
                console.log(">>ERROR>>",err);
            } else {
                res.status(200).json()
            }
        })
        res.status(200).json(articlesResponse);
    }

   await fs.readFile('./pages/api/articlesData.json', 'utf-8',async (err,jsonString) => {
       if(err){
           console.log(">>ERROR>>>",err)
       } else {
           const articles = JSON.parse(jsonString);
           if(req.query.delete){
               const filteredArticles = articles.filter(article => article.slug !== req.query.delete);
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
               res.status(200).json(articles);
           }
       }
    });
}