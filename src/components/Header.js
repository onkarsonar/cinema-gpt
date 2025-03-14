import React, { useEffect } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { const_photoURL, LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const lang = useSelector(store => store.config.lang); // ✅ Get the current language
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
      // ✅ Debugging Redux state
    dispatch(changeLanguage(e.target.value)); // ✅ Debugging Redux state update
  };

  return (
    <div className='flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
      <img className='w-44' src={LOGO} alt="Logo" />
      {user && (
        <div className='flex p-2'>
          {/* ✅ Ensure dropdown reflects the selected language */}
         { showGptSearch &&  <select 
            className='p-2 m-2 bg-gray-900 text-white' 
            onChange={handleLanguageChange} 
            value={lang} // ✅ Keeps selection persistent
          >
            <option value="en">Language / भाषा / Sprache</option>
            {SUPPORTED_LANGUAGES?.map((language) => ( 
              <option key={language.identifier} value={language.identifier}>
                {language.name}
              </option>
            )) || []}
          </select>
          }

          <button 
            className="py-2 px-4 mx-4 my-2 bg-purple-800 rounded-lg text-white" 
            onClick={handleGptSearchClick}
          >
           { showGptSearch ? "Home Page" : "GPT Search" }
          </button>

          <img 
            className='w-10 h-10' 
            alt='userIcon' 
            src={user?.photoURL || const_photoURL} 
          />

          <button onClick={handleSignOut} className='font-bold text-white'>
            &nbsp;Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
