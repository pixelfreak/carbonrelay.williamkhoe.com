import { useState, useEffect, useRef } from 'react';

const storageKey = 'carbonrelay';

function useMovies(category = 'popular', initialMovies)
{
    const [movies, setMovies] = useState(initialMovies);
    const moviesMemoMap = useRef(new Map().set(category, movies));

    useEffect(() =>
    {
        const fetchData = async () => 
        {
            const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${category}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
            const data = await response.json();

            moviesMemoMap.current.set(category, data);
            setMovies(data);
        };
    
        if (moviesMemoMap.current.has(category))
        {
            setMovies(moviesMemoMap.current.get(category));
        }
        else
        {
            fetchData();
        }

    }, [category]);

    return [ movies ];
}

function useSearch(query = '')
{
    const [results, setResults] = useState(null);
    const resultsMemoMap = useRef(new Map().set(query, results));

    useEffect(() =>
    {
        const fetchData = async () => 
        {
            const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/movie/?query=${encodeURIComponent(query)}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
            const data = await response.json();

            resultsMemoMap.current.set(query, data);
            setResults(data);
        };
    
        if (resultsMemoMap.current.has(query))
        {
            setResults(resultsMemoMap.current.get(query));
        }
        else
        {
            fetchData();
        }
    }, [query]);

    return [results];
}

function useLists()
{
    const [lists, setLists] = useState([]);
    const didMount = useRef(false);

    // For SSR
    if (typeof localStorage === 'undefined')
    {
        return { lists };
    }

    useEffect(() =>
    {
        if (didMount.current)
        {
            const storage = JSON.parse(localStorage.getItem(storageKey)) || {};
            storage.lists = lists;
            localStorage.setItem(storageKey, JSON.stringify(storage));
        }
        else
        {
            didMount.current = true;

            const storage = JSON.parse(localStorage.getItem(storageKey));

            if (storage && storage.lists)
            {
                setLists(storage.lists);
            }
        }
        
    }, [lists]);

    function createList(name)
    {
        const id = Date.now(); // This is unique only in local browser
        const newList = { id, name, movies: [], lastUpdated: Date.now() };
        const newLists = [...lists, newList].sort((a, b) => a.lastUpdated - b.lastUpdated);

        setLists(newLists);

        return newList;
    }

    function deleteList(id)
    {
        const newLists = lists.filter((list) => list.id != id);
        setLists(newLists);
    }

    function addMovieToList(list, movie)
    {
        addMovieToMovies(movie, list.movies);
        list.lastUpdated = Date.now();

        setLists([...lists]);
    }

    function addMovieToNewList(name, movie)
    {
        const newList = createList(name);
        addMovieToMovies(movie, newList.movies);
        newList.lastUpdated = Date.now();

        return newList;
    }

    function addMovieToMovies(movie, movies)
    {
        if (!movies.find(item => item.id === movie.id))
        {
            movies.push({ id: movie.id, poster_path: movie.poster_path, title: movie.title, release_date: movie.release_date});
        }
    }

    function removeMovieFromList(listId, movie)
    {

    }

    return { lists, createList, deleteList, addMovieToList, addMovieToNewList, removeMovieFromList };
}

export { useMovies, useSearch, useLists };