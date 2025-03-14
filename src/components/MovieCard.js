import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({alt,posterPath}) => {
    // console
  return (
    <div className='w-48 pr-1'>
      <img alt={alt} src={IMG_CDN_URL+posterPath} />
    </div>
  )
}

export default MovieCard;
