import Link from 'next/link';
import css from '../styles/lists.module.scss';

function List({ data })
{
    return (
        <Link href={`/list/${data.id}`}>
            <div className={css['list']}>
                <h2>{data.name}</h2>
                <p>{data.movies.length} movies</p>
            </div>
        </Link>
    );
}

export default function Lists({ data })
{
    return (
        <>
        {(data && data.length > 0) ?
            <div className={css['lists']}>
                {data.map(list =>
                    <List key={list.id} data={list}/>
                )}
            </div>
            :
            <div className={css['no-results']}>
                <h3>You have no list. Make one!</h3>
            </div>
        }
        </>
    );
}