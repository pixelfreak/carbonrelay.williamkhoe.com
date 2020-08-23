import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from './placeholder-image';
import css from '../styles/movies.module.scss';

export default function PosterImage({ path, title })
{
    const width = 780, height = 1170; // TODO

    if (!path)
    {
        return <PlaceholderImage width={width} height={height}/>;        
    }
    else
    {
        const srcSet = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500/${path} 500w,
                    ${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w400/${path} 400w,
                    ${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w300/${path} 300w,
                    ${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w200/${path} 200w`;
        return (
            <LazyLoadImage className={css['poster-image']} placeholder={<PlaceholderImage width={width} height={height}/>} effect="opacity" srcSet={srcSet} alt={`${title} Poster`}/>
        );
    }
}