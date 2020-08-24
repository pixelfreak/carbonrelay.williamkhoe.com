import Link from 'next/link';
import PosterImage from '../components/poster-image';
import moment from 'moment';
import css from '../styles/movies.module.scss';

function Movie({ data, onDelete })
{
    return (
        <Link href={`/movie/${data.id}`}>
            <div className={css['movie']}>
                <PosterImage path={data.poster_path} title={data.title}/>
                <h2>{data.title}</h2>
                <p>{moment(data.release_date).format('MMM D, YYYY')}</p>
                {onDelete ?
                    <button className={css['delete']} onClick={(e) => { e.stopPropagation(); onDelete(data); }}>
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z"/><path d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z"/></g></svg>
                    </button>
                    :
                    <></>
                }
            </div>
        </Link>
    );
}

export default function Movies({ data, onDelete })
{
    return (
        <>
        {(data && data.length > 0) ?
            <div className={css['movies']}>
                {data.map(movie =>
                    <Movie key={movie.id} data={movie} onDelete={onDelete}/>
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