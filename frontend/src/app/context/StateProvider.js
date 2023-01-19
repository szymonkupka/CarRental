import React, { createContext, useContext, useReducer, useEffect, useState  } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <StateContext.Provider value={{ user, googleSignIn, logOut}}>
      {children}
    </StateContext.Provider>
  );
};

export  const useStateValue = () => {
   return  useContext(StateContext);
  };