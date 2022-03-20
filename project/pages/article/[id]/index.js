import { server } from '../../../config'
import {useRouter} from 'next/router'
import Link from 'next/link'

function article ({article}) {
    const {query: {id} } = useRouter()
    return (
        <>
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{__html: article.excerpt}}/>
            <img src={`https://www.alpha-orbital.com/assets/images/post_img/${article.post_image}`}/>
            <br/>
            <Link href='/'>Go Back</Link>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const res = await fetch(`${server}/api/articles/${context.params.id}`);

    const singleArticle = await res.json();

    return {
        props: {
            article: singleArticle
        }
    }
}

export default article;