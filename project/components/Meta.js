import Head from 'next/head'

function Meta({ title, keywords, description }) {
    return (
        <Head>
            <meta name='viewpoint' content='width=device-width,initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description}/>
            <meta charSet='utf-8'/>
            <link rel='icon' href='/favicon.ico'/>
            <title>{title}</title>
        </Head>
    );
}

Meta.defaultProps = {
    title: 'React challenge',
    keywords: 'programming, javascript',
    description: 'React next for Human challenge'
}
export default Meta;