import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Movies from '../../components/movies';
import Layout from '../../components/layout';
import css from '../../styles/list-details.module.scss';
import { useLists } from '../../lib/tmdb';
import DefaultErrorPage from 'next/error';

export default function List()
{
    const router = useRouter();
    const { lists, deleteList } = useLists();

    const list = (lists) ? lists.find((list) => list.id == router.query.id) : null;

    if (!list)
    {
        return (
            <Layout>
                <Head>
                    <meta name="robots" content="noindex"/>
                </Head>
                <DefaultErrorPage statusCode={404} />
            </Layout>
        );
    }

    function handleDeleteClick()
    {
        deleteList(list.id);
        router.push('/lists');
    }

    return (
        <Layout>
            <Head>
                <title>{list.name} - The Movie DB</title>
            </Head>

            <section className={css['list-details']}>
                <div className={css['content']}>
                    <header>
                        <h2>{list.name}</h2>
                    </header>
                    <div className={css['action']}>
                        <button className="btn">Edit</button>
                        <button className="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
                    </div>
                    {(list.movies?.length > 0) ?
                        <Movies data={list.movies}/>
                        :
                        <div className={css['no-results']}>
                            <h3>This list is empty. <Link href="/search"><a>Add some movies</a></Link>.</h3>
                        </div>
                    }
                </div>
            </section>
        </Layout>
    )
}
