import { User } from '../types/api.types';
import { LOCALE_STORAGE_USER } from '../common/constants';

export const isBrowser = typeof window !== 'undefined';
export const getLocalStorage = (key: string): string | null => {
  if (!isBrowser) return null;
  return localStorage.getItem(key);
};

export const setLocalStorage = (
  key: string,
  value: string
): VoidFunction | undefined => {
  if (!isBrowser) return;
  localStorage.setItem(key, value);
};

export const clearLocalStorage = (key: string): VoidFunction | undefined => {
  if (!isBrowser) return;
  localStorage.removeItem(key);
};
/**
 * Helper function to get user from locale storage if exists
 */
export const getUserFromLocaleStorageIfAny = (): User => {
  const user = getLocalStorage(LOCALE_STORAGE_USER);
  return user ? JSON.parse(user) : {};
};
