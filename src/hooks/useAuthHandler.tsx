import { useState } from 'react';
import { setLocalStorage, clearLocalStorage } from '../services/localStorage';
import { User } from '../types/api.types';
import { LOCALE_STORAGE_USER, LOCALE_STORAGE_TOKEN } from '../common/constants';

type AuthHandlerHook = {
  currentUser: User | null;
  setCurrentUser: (authUser?: User | null) => void;
  authToken: string | null;
  setAuthToken: (authToken?: string | null) => void;
};
/**
 * Custom hook used as a helper to handle authentication status
 * @param initialUser user object can be passed
 */
const useAuthHandler = (
  initialUser: User | null = null,
  initialToken: string | null = null
): AuthHandlerHook => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [token, setToken] = useState<string | null>(initialToken);
  /**
   * Store/Clear the current user value
   * Presist the user to the locale storage
   * @param user The user object
   */
  const setCurrentUser = (authUser: User | null = null) => {
    if (!authUser) {
      clearLocalStorage(LOCALE_STORAGE_USER);
      setUser(null);
      return;
    }
    setLocalStorage(LOCALE_STORAGE_USER, JSON.stringify(authUser));
    setUser(authUser);
  };

  /**
   * Store/Clear JWT
   * @param authToken The token
   */
  const setAuthToken = (authToken: string | null = null) => {
    if (!authToken) {
      setToken('');
      return;
    }
    setLocalStorage(LOCALE_STORAGE_TOKEN, authToken);
    setToken(authToken);
  };
  return {
    currentUser: user,
    setCurrentUser,
    authToken: token,
    setAuthToken,
  };
};
export default useAuthHandler;
