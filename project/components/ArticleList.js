import articleStyles from '../styles/Article.module.css'
import ArticleItem from './ArticleItem'

function ArticleList({articles}) {
    return (
        <div className={articleStyles.grid}>
            {articles.map((art, index) => (<ArticleItem article={art} key={index}/>))}
        </div>
    );
}

export default ArticleList;