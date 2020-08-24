import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Movies from '../../components/movies';
import Layout from '../../components/layout';
import css from '../../styles/list-details.module.scss';
import { useLists } from '../../lib/tmdb';
import DefaultErrorPage from 'next/error';
import { useState, useRef, useEffect } from 'react';

export default function List()
{
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [listName, setListName] = useState('');
    const { lists, removeMovieFromList, deleteList } = useLists();
    const editInput = useRef(null);

    const list = (lists) ? lists.find((list) => list.id == router.query.id) : null;

    function handleEditClick()
    {
        setIsEditing(true);
        editInput.current.focus();
    }

    function handleEditOnKeyUp(e)
    {
        if (e.key === 'Enter' || e.keyCode === 13) 
        {
            setIsEditing(false);
        }
    }

    function handleDeleteClick()
    {
        deleteList(list.id);
        router.push('/lists');
    }

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

    return (
        <Layout>
            <Head>
                <title>{list.name} - The Movie DB</title>
            </Head>

            <section className={css['list-details']}>
                <div className={css['content']}>
                    <header>
                        <h2>
                            {isEditing ? 
                                <div className={css['edit-form']}>
                                    <input autoFocus ref={editInput} type="text" value={listName} onChange={(e) => setListName(e.currentTarget.value)} onKeyUp={handleEditOnKeyUp}/>
                                </div>
                                :
                                <div>{list.name}</div>
                            }
                        </h2>
                        <div className={css['action']}>
                            {/* <button className={css['edit']} onClick={handleEditClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.947 383.947"><g><g><g><polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 			"/><path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04C386.027,77.92,386.027,64.373,377.707,56.053z"/></g></g></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
                            </button> */}
                            <button className={css['delete']} onClick={handleDeleteClick}>
                                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z"/><path d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z"/></g></svg>
                            </button>
                        </div>
                    </header>
                    {(list.movies?.length > 0) ?
                        <Movies data={list.movies} onDelete={(movie) => removeMovieFromList(list, movie) }/>
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
