import { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Head from 'next/head'
import Layout from '../components/layout';
import SearchBox from '../components/search-box';
import css from '../styles/search.module.scss';
import Movies from '../components/movies';
import { useSearch } from '../lib/tmdb';

export default function Search()
{
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [data] = useSearch(query, page);

    return (
        <Layout>
            <Head>
                <title>Search - The Movie DB</title>
            </Head>

            <section className={css['search']}>
                <div className={css['content']}>
                    <header>
                        <SearchBox autoFocus onChange={(value) => { setQuery(value); setPage(1); /* TODO: This will cause multiple side-effects because it's coming from a non-React based event (setTimeout). Change to reducer if performance is an issue. */ } } placeholder="Search for a movie..."/>
                    </header>
                    <Movies data={(data) ? data.results : null}/>
                    {(data) ?
                        <div className="pagination">
                            <Pagination count={data.total_pages} page={page} size="large" onChange={(e, value) => { setPage(value); }}/>
                        </div>
                        :
                        <></>
                    }
                    
                </div>
            </section>
        </Layout>
    );
}
