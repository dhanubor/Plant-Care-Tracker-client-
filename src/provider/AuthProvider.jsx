import React, { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  reload
} from "firebase/auth";
import app from './../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

// Google Provider setup
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(10000);

  // Create user with email and password
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const upDateUser = async (updateData) => {
    try {
      if (!auth.currentUser) {
        throw new Error('No user is currently signed in');
      }

      // Update profile in Firebase
      await updateProfile(auth.currentUser, updateData);
      
      // Reload user to get fresh data
      await reload(auth.currentUser);
      
      // Update local state
      const updatedUser = {
        ...auth.currentUser,
        displayName: updateData.displayName || auth.currentUser.displayName,
        photoURL: updateData.photoURL || auth.currentUser.photoURL
      };
      
      setUser(updatedUser);
      
      return Promise.resolve(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Sign out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Set amount value (for your app's specific needs)
  const setAmountValue = (value) => {
    setAmount(value);
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // User is signed in
          await reload(currentUser);
          
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            emailVerified: currentUser.emailVerified,
            metadata: currentUser.metadata
          };
          
          setUser(userData);
        } else {
          // User is signed out
          setUser(null);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setUser(currentUser);
      } finally {
        setLoading(false);
      }
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Auth context value
  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    signInWithGoogle,
    upDateUser,
    logOut,
    loading,
    setLoading,
    amount,
    setAmountValue
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;