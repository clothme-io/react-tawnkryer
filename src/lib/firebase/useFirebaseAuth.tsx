import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebaseConfig';

const formatAuthUser = (user: { uid: any; email: any }) => ({
  uid: user.uid,
  email: user.email,
});

export function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const signInWithEmail = (email: any, password: any) =>
    signInWithEmailAndPassword(auth, email, password);

  const createUserWithEmail = (email: any, password: any) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signOut = () => auth.signOut().then(clear);
  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  return {
    authUser,
    loading,
    signInWithEmail,
    createUserWithEmail,
    signOut,
  };
}
