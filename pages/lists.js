import Head from 'next/head'
import Layout from '../components/layout';
import css from '../styles/lists.module.scss';
import { useLists } from '../lib/tmdb';
import Lists from '../components/lists';
import Link from 'next/link';

export default function Search()
{
    const { lists } = useLists();

    return (
        <Layout>
            <Head>
                <title>Lists - The Movie DB</title>
            </Head>

            <section className={css['lists']}>
                <div className={css['content']}>
                    <header>
                        <h2>My Lists</h2>
                        <Link href="/list/create">
                            <button className="btn">Create List</button>
                        </Link>
                    </header>

                    <Lists data={lists} />
                </div>
            </section>
        </Layout>
    );
}
