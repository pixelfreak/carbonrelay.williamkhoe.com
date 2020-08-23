import { useState } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import { useMovies } from '../lib/tmdb';
import css from '../styles/movies.module.scss';
import Movies from '../components/movies';

const initialCategory = 'popular';

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
    const [movies] = useMovies(activeCategory, initialMovies);

    return (
        <Layout>
            <Head>
                <title>The Movie DB</title>
            </Head>

            <section className={css['movie-browser']}>
                <div className="content">
                    <header>
                        <nav>
                            <button className={(activeCategory === 'popular') ? css.active : ''} onClick={() => setActiveCategory('popular')}>Popular</button>
                            <button className={(activeCategory === 'top_rated') ? css.active : ''} onClick={() => setActiveCategory('top_rated')}>Top Rated</button>
                            <button className={(activeCategory === 'now_playing') ? css.active : ''} onClick={() => setActiveCategory('now_playing')}>Now Playing</button>
                        </nav>
                    </header>
                    <Movies data={movies.results}/>
                </div>
            </section>
        </Layout>
    )
}
