import React, { createContext } from 'react';
import useAuthHandler from '../hooks/useAuthHandler';
import { getLocalStorage, clearLocalStorage } from '../services/localStorage';
import { LOCALE_STORAGE_USER, LOCALE_STORAGE_TOKEN } from '../common/constants';
import { User } from '../types/api.types';

/**
 * Helper function to get user from locale storage if exists
 */
const getUserFromLocaleStorageIfAny = () => {
  const user = getLocalStorage(LOCALE_STORAGE_USER);
  return user ? JSON.parse(user) : {};
};

type AuthContextType = {
  isLoggedIn: boolean;
  currentUser: User | null;
  setCurrentUser: (authUser?: User | null) => void;
  authToken: string | null;
  setAuthToken: (authToken?: string | null) => void;
  logout: VoidFunction;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  currentUser: null,
  setCurrentUser: () => {},
  authToken: '',
  setAuthToken: () => {},
  logout: () => {},
});

/**
 * Auth Context Provider
 */
export const AuthProvider: React.FC = ({ children }) => {
  const { currentUser, setCurrentUser, authToken, setAuthToken } =
    useAuthHandler(getUserFromLocaleStorageIfAny());

  const logUserOut = () => {
    setCurrentUser(null);
    setAuthToken(null);
    setCurrentUser(null);
    setAuthToken('');
    clearLocalStorage(LOCALE_STORAGE_USER);
    clearLocalStorage(LOCALE_STORAGE_TOKEN);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: currentUser?.id ? true : false,
        currentUser,
        setCurrentUser,
        authToken,
        setAuthToken,
        logout: logUserOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
