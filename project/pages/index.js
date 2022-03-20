import { server } from '../config'
import ArticleList from "../components/ArticleList";
import DropdownMenu from "../components/DropdownMenu";
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
         fetch(`${server}/api/articles/${selectedCategory}`)
            .then(data => data.json())
            .then(data => {
                const filteredArticles = data.filter(article => article.slug !== articleSlug)
                setArticles(filteredArticles);
                setLoading(false);
            })
    }

    const onSearchInputChange = (searchTerm) => {
        if(searchTerm === '') {
            fetch(`${server}/api/articles/${selectedCategory}`)
                .then(data => data.json())
                .then(data => {
                    setArticles(data);
                    setLoading(false);
                })
        }
        if(searchTerm.length > 3) {
            setLoading(true);
           fetch(`${server}/api/articles/${selectedCategory}`)
                .then(data => data.json())
                .then(data => {
                    const filteredArticles = data.filter(article => article.title.toUpperCase().includes(searchTerm.toUpperCase()));
                    setArticles(filteredArticles);
                    setLoading(false);
                })
        }
    }

  return (
    <>
        <NavigationMenu
            onSelectCategory={onCategorySelect}
            articles={articles}
            onSearchInputChange={onSearchInputChange}
        />
        <p>Total data: {articles.length}</p>
        {loading ? <h2>Loading...</h2> : <ArticleList articles={articles} onDeleteArticle={onDeleteArticle}/>}
    </>
  )
}
