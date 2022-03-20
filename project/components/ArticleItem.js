import articleStyle from '../styles/Article.module.css'
import {useState} from "react";

function ArticleItem({article, onDeleteArticle}) {
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const onHoverArticle = () => {
        setShowDeleteButton(true);
    }

    return (
        <button
            className={articleStyle.wrapper}
            onMouseEnter={onHoverArticle}
            onMouseLeave={() => setShowDeleteButton(false)}
        >
            {showDeleteButton && <div onClick={() => onDeleteArticle(article.slug)} className={articleStyle.deleteButton}>Delete</div>}
                <a href={`https://www.alpha-orbital.com/news/${article.slug}`} target="_blank" rel="noopener noreferrer">
                    <h3 className={articleStyle.title}>{article.title}</h3>
                    <img src={`https://www.alpha-orbital.com/assets/images/post_img/${article.post_image}`}
                         className={articleStyle.image}
                    />
                    <div dangerouslySetInnerHTML={{__html: article.excerpt}}/>
                </a>
        </button>
    );
}

export default ArticleItem;