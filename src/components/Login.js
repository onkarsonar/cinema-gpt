import React from 'react';
import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    //validate form data
    const message = checkValidData(email.current.value, password.current.value);

    console.log(email.current.value, password.current.value);
    // console.log(message);

    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/30930724?u=0d185a7fbf57cb0ed65423102ec387509ba12ea4&v=4"
          }).then(() => {
               const {uid,email,displayName,photoURL} = auth.currentUser;
                        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
            // Profile updated!
            navigate("/browse");
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
        
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "----" + errorMessage);

            navigate("/error");
          });
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "----" + errorMessage);
          // ..
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);

          navigate("/browse");
          // ...

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "----" + errorMessage);
        });

    }

  }
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/e3e9c31f-aa15-4a8f-8059-04f01e6b8629/web/IN-en-20250113-TRIFECTA-perspective_febfa442-23d9-45f3-937e-72f8b971f7a9_large.jpg" alt="Background_img" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-85'>
        <h1 className='font-bold text-3xl py-4' >{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (<input type='text' ref={name} placeholder='Your Name' className='p-4 my-2 w-full bg-gray-600' />)}
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-2 w-full bg-gray-600' />

        <input ref={password} type='password' placeholder='Password' className='p-4 my-2 w-full bg-gray-600' />
        <p className='text-red-500'>{errorMessage}</p>
        <button className='p-4 my-6 w-full bg-red-800 rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm} >{isSignInForm ? "New to Netflix ? Sign Up Now" : "Already a User ? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login;
