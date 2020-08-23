import { useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Head from 'next/head'
import Layout from '../components/layout';
import { useMovies } from '../lib/tmdb';
import css from '../styles/movies.module.scss';
import Movies from '../components/movies';

const initialCategory = 'popular';
const categories = [
    { key: 'popular', name: 'Popular' },
    { key: 'top_rated', name: 'Top Rated' },
    { key: 'now_playing', name: 'Now Playing' },
];

export async function getServerSideProps()
{
    const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${initialCategory}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    const initialMovies = await response.json();

    return {
        props:
        {
            initialMovies
        }
    }
}

export default function Home({ initialMovies })
{
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [page, setPage] = useState(1);
    const [movies] = useMovies(activeCategory, page, initialMovies);

    return (
        <Layout>
            <Head>
                <title>The Movie DB</title>
            </Head>

            <section className={css['movie-browser']}>
                <div className="content">
                    <header>
                        <nav>
                            {categories.map(category =>
                                <button key={category.key} className={(activeCategory === category.key) ? css.active : ''} onClick={() => { setActiveCategory(category.key); setPage(1); } }>{category.name}</button>
                            )}
                        </nav>
                    </header>
                    <Movies data={movies.results}/>
                    <div className="pagination">
                        <Pagination count={movies.total_pages} page={page} size="large" onChange={(e, value) => { setPage(value); }}/>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
