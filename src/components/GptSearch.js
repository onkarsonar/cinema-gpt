import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMoviesSuggestions from './GptMoviesSuggestions';
import { BG_IMG_NETFLIX } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
          <div className='absolute -z-10'>
        <img src={BG_IMG_NETFLIX} alt="Background_img" />
      </div>
     <GptSearchBar/>
     <GptMoviesSuggestions/>
    </div>
  )
}

export default GptSearch;
