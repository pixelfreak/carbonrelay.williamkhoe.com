import { useState } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import SearchBox from '../components/search-box';
import css from '../styles/search.module.scss';
import Movies from '../components/movies';
import { useSearch } from '../lib/tmdb';

export default function Search()
{
    const [query, setQuery] = useState('');
    const [data] = useSearch(query);

    return (
        <Layout>
            <Head>
                <title>Search - The Movie DB</title>
            </Head>

            <section className={css['search']}>
                <div className={css['content']}>
                    <header>
                        <SearchBox onChange={(value) => setQuery(value) } placeholder="Search for a movie..."/>
                    </header>
                    <Movies data={(data) ? data.results : null}/>
                </div>
            </section>
        </Layout>
    );
}
