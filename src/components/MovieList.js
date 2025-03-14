import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({title,movies}) => {
    // console.log(movies);
  return (
    // <div className='p-6'>
    <div className='px-6'>
    <h1 className="text-lg py-4 md:text-3xl text-white">{title}</h1>
    <div className='flex overflow-x-auto no-scrollbar'>
        <div className='flex'>
    {movies?.length > 0 && movies
        .filter(movie => movie.poster_path) // Remove movies with null backdrop_path
         .map(movie => (
         <MovieCard key={movie.id} posterPath={movie.poster_path} alt={movie.title} />
        ))
    }
            </div>
            </div>
        </div>
     
 
  )
}

export default MovieList;
