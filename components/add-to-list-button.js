import { useState } from 'react';
import { useLists } from '../lib/tmdb';
import Popover from '@material-ui/core/Popover';
import css from '../styles/add-to-list.module.scss';

export default function AddToListButton({ movie })
{
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [newListName, setNewListName] = useState('');
    const { lists, addMovieToList, addMovieToNewList } = useLists();

    function handleAddToListClick(e)
    {
        setAnchor(e.currentTarget);
        setOpen(true);
    }
    
    function handleListClick(list)
    {
        addMovieToList(list, movie);
        setOpen(false);
    }

    function handleAddToNewListClick(e)
    {
        if (newListName)
        {
            addMovieToNewList(newListName, movie);
            setNewListName('');
        }
        setOpen(false);
    }

    return (
        <>
        <button className="btn" onClick={handleAddToListClick}>Add to List</button>
        <Popover open={open} anchorEl={anchor} onClose={() => setOpen(false)} anchorOrigin={{vertical: 'top', horizontal: 'right',}} transformOrigin={{vertical: 'top', horizontal: 'left',}}>
            <div className={css['lists']}>
                {lists.map(list =>
                    <button key={list.id} onClick={() => handleListClick(list)}>{list.name}</button>
                )}
            </div>
            <div className={css['new-list']}>
                <input type="text" placeholder="New List" onChange={(e) => setNewListName(e.currentTarget.value)} value={newListName}/>
                <button type="submit" onClick={handleAddToNewListClick}>Add</button>
            </div>
        </Popover>
        </>
    );
}
