import PosterImage from '../../components/poster-image';
import moment from 'moment';
import Head from 'next/head'
import Layout from '../../components/layout';
import AddToListButton from '../../components/add-to-list-button';
import css from '../../styles/movie-details.module.scss';

export async function getServerSideProps({ query })
{
    const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${query.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    const movie = await response.json();

    return {
        props:
        {
            movie
        }
    }
}

export default function Movie({ movie })
{
    let genres = '';
    if (movie.genres.length > 0)
    {
        genres = movie.genres.map(({id, name}) => name).reduce((acc, cur) => `${acc}, ${cur}`)
    }

    return (
        <Layout>
            <Head>
                <title>{movie.title} - The Movie DB</title>
            </Head>

            <section className={css['movie-details']}>
                <div className={css['content']}>
                    <figure>
                        <PosterImage path={movie.poster_path} title={movie.title}/>
                    </figure>
                    <article>
                        <h2>{movie.title}</h2>
                        <div className={css['metadata']}>
                            <span>{moment(movie.release_date).format('MM/DD/YYYY')} </span>
                            <span>{genres}</span>
                        </div>
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                        <div className={css['action']}>
                            <AddToListButton movie={movie}/>
                        </div>
                    </article>
                </div>
            </section>
        </Layout>
    )
}
