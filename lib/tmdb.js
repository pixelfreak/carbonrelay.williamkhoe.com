import { useState, useEffect, useRef } from 'react';

const storageKey = 'carbonrelay';

function useMovies(category = 'popular', page = 1, initialMovies)
{
    const [movies, setMovies] = useState(initialMovies);
    const moviesMemoMap = useRef(new Map().set(`${category}-${page}`, movies));

    useEffect(() =>
    {
        const fetchData = async () => 
        {
            const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${category}?page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
            const data = await response.json();

            moviesMemoMap.current.set(`${category}-${page}`, data);
            setMovies(data);
        };
    
        if (moviesMemoMap.current.has(`${category}-${page}`))
        {
            setMovies(moviesMemoMap.current.get(`${category}-${page}`));
        }
        else
        {
            fetchData();
        }

    }, [category, page]);

    return [ movies ];
}

function useSearch(query = '', page = 1)
{
    const [results, setResults] = useState(null);
    const resultsMemoMap = useRef(new Map().set(`${query}-${page}`, results));

    useEffect(() =>
    {
        const fetchData = async () => 
        {
            const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/movie/?query=${encodeURIComponent(query)}&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
            const data = await response.json();
            console.log(data);
            resultsMemoMap.current.set(`${query}-${page}`, data);
            setResults(data);
        };
    
        if (resultsMemoMap.current.has(`${query}-${page}`))
        {
            setResults(resultsMemoMap.current.get(`${query}-${page}`));
        }
        else
        {
            fetchData();
        }
    }, [query, page]);

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

    function removeMovieFromList(list, movie)
    {
        list.movies = list.movies.filter(item => movie.id !== item.id);
        list.lastUpdated = Date.now();

        setLists([...lists]);
    }

    return { lists, createList, deleteList, addMovieToList, addMovieToNewList, removeMovieFromList };
}

export { useMovies, useSearch, useLists };