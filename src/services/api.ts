import axios, { AxiosRequestConfig } from 'axios';

import {
  UserSignupData,
  UserSigninData,
  UserSigninResponse,
} from '../types/api.types';

const axiosInstance = () => {
  const token = undefined;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const params: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_STRAPI_API_URL,
    timeout: 10000,
  };
  if (headers) {
    params.headers = headers;
  }
  return axios.create(params);
};

/**
 * Sign the user up
 * @param values The user information
 */
export const signUp = async (
  values: UserSignupData
): Promise<UserSigninResponse> => {
  const { data } = await axiosInstance().post('/auth/local/register', values);
  return data;
};

export const signin = async (
  values: UserSigninData
): Promise<UserSigninResponse> => {
  const { data } = await axiosInstance().post(`/auth/local`, values);
  return data;
};
