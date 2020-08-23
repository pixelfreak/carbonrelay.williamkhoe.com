import Link from 'next/link';
import PosterImage from '../components/poster-image';
import moment from 'moment';
import css from '../styles/movies.module.scss';

function Movie({ data })
{
    return (
        <Link href={`/movie/${data.id}`}>
            <div className={css['movie']}>
                <PosterImage path={data.poster_path} title={data.title}/>
                <h2>{data.title}</h2>
                <p>{moment(data.release_date).format('MMM D, YYYY')}</p>
            </div>
        </Link>
    );
}

export default function Movies({ data })
{
    return (
        <>
        {(data && data.length > 0) ?
            <div className={css['movies']}>
                {data.map(movie =>
                    <Movie key={movie.id} data={movie}/>
                )}
            </div>
            :
            (!data) ?
                <div className={css['no-results']}>
                    <h3>Start typing to see results...</h3>
                </div>
                :
                <div className={css['no-results']}>
                    <h3>No movies matched your query. Give it another go!</h3>                    
                </div>
        }
        </>
    );
}