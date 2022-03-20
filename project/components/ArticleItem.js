import Link from 'next/link'
import articleStyle from '../styles/Article.module.css'

function ArticleItem({article}) {
    return (
        <Link href="/article/[id]" as={`/article/${article.slug}`}>
            <a className={articleStyle.card}>
                <h3>{article.title}</h3>
                <div dangerouslySetInnerHTML={{__html: article.excerpt}}/>
            </a>
        </Link>
    );
}

export default ArticleItem;