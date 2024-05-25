import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import useAxiosPub from '../Hooks/useAxiosPub';
export const ContextAuth = createContext();

const Provider = ({ children }) => {
  const axiosPub = useAxiosPub();
  const [isLoading, setLoading] = useState(true);
  const [userDta, setUserDta] = useState(null);
  // Register User
  const emlPassRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //  emlPassLogin
  const emlPassLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Profile Update
  const profileUpdate = (nam, photoUrl) => {
    // setLoading(false);
    return updateProfile(auth.currentUser, {
      displayName: nam,
      photoURL: photoUrl,
    });
  };

  // ============= Social Login ============
  // social login provider
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const gitHubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };

  // Logout account
  const logOutAcc = () => {
    // console.log('JWT logout Token,', data);
    return signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUserDta(currentUser);
      setLoading(false);
      // if (currentUser) {
      //   const userInfo = { email: currentUser.email };
      //   const { data } = await axiosPub.post('/jwt', userInfo);
      //   // console.log(data.token);
      //   if (data.token) {
      //     localStorage.setItem('access-token', data.token);
      //   }
      // } else {
      //   localStorage.removeItem('access-token');
      //   //
      // }
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPub]);
  const authDta = {
    emlPassRegister,
    emlPassLogin,
    gitHubLogin,
    googleLogin,
    logOutAcc,
    userDta,
    isLoading,
    setLoading,
    profileUpdate,
  };
  return (
    <ContextAuth.Provider value={authDta}>{children}</ContextAuth.Provider>
  );
};

export default Provider;
Provider.propTypes = {
  children: PropTypes.node,
};
