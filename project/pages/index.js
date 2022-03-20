import { server } from '../config'
import ArticleList from "../components/ArticleList";
import {useEffect, useState} from "react";
import NavigationMenu from "../components/NavigationMenu";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setCategory] = useState('');

    useEffect(() => {
        setLoading(true);
       const res = fetch(`${server}/api/articles`)
           .then(data => data.json())
           .then(data => {
               setArticles(data);
               setLoading(false);
           })
    }, []);

    const onCategorySelect = (categoryId) => {
        setLoading(true);
        if(categoryId === 'all') {
            setCategory('');
            const res = fetch(`${server}/api/articles`)
                .then(data => data.json())
                .then(data => {
                    setArticles(data);
                    setLoading(false);
                })
        } else {
            setCategory(categoryId);
            const res = fetch(`${server}/api/articles/${categoryId}`)
                .then(data => data.json())
                .then(data => {
                    setArticles(data);
                    setLoading(false);
                })
        }
    }

    const onDeleteArticle = (articleSlug) => {
        setLoading(true);
         fetch(`${server}/api/articles/${selectedCategory}?delete=${articleSlug}`)
            .then(data => data.json())
            .then(data => {
                const filteredArticles = data.filter(article => article.slug !== articleSlug)
                setArticles(filteredArticles);
                setLoading(false);
            })
    }

    const onSearchInputChange = (searchTerm) => {
        if(searchTerm === ''){
            setLoading(true);
            fetch(`${server}/api/articles/${selectedCategory}`)
                .then(data => data.json())
                .then(data => {
                    setArticles(data);
                    setLoading(false);
                })
        }
        if(searchTerm.length > 3) {
            setLoading(true);
           fetch(`${server}/api/articles/${selectedCategory}?search=${searchTerm}`)
                .then(data => data.json())
                .then(data => {
                    setArticles(data);
                    setLoading(false);
                })
        }
    }

const onClickReFetch = () => {
        setLoading(true);
      fetch(`${server}/api/articles?restore=1`)
          .then(data => data.json()).then(data => {
              setArticles(data);
              setLoading(false);
      })
}
  return (
    <>
        <NavigationMenu
            onSelectCategory={onCategorySelect}
            articles={articles}
            onSearchInputChange={onSearchInputChange}
        />
        {articles.length < 100 && <button onClick={onClickReFetch}>RE-FETCH</button>}
        <p>Total data: {articles.length}</p>
        {loading ? <h2>Loading...</h2> : <ArticleList articles={articles} onDeleteArticle={onDeleteArticle}/>}
    </>
  )
}
