import axios, { AxiosRequestConfig } from 'axios';

import {
  UserSignupData,
  UserSigninData,
  UserSigninResponse,
  Classroom,
} from '../types/api.types';
import { DataAdapter } from './adapter';
import { getTokenFromLocaleStorageIfAny } from './localStorage';

const axiosInstance = () => {
  const token = getTokenFromLocaleStorageIfAny();
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const params: AxiosRequestConfig = {
    baseURL: `${process.env.REACT_APP_STRAPI_API_URL}/api`,
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

export const getClassrooms = async (): Promise<Classroom[]> => {
  const { data } = await axiosInstance().get('/classrooms?populate=*');
  return DataAdapter.apiClasses2AppClasses(data);
};

export const getSingleClassRoom = async (id: number): Promise<Classroom> => {
  const { data } = await axiosInstance().get(`/classrooms/${id}?populate=*`);
  return DataAdapter.apiClass2AppClass(data);
};

export const enrollInClassroom = async (id: number): Promise<Classroom> => {
  const { data } = await axiosInstance().post(`/enroll/${id}`);
  return data;
};
