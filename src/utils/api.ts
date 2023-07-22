import AsyncStorage from '@react-native-async-storage/async-storage';

import {baseUrl} from '../config';

type Option = {
  endpoint: string;
  payload?: any;
  method: 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'PUT';
  baseUrl?: string;
  token?: string;

  header?: any;
};

/**
 * Function to make api call to endpoint provided
 * @param {Option} [option] - This is the object that contains the request parameters.
 * @returns Promise<ResponseType<T>>l
 */

const generateBaseUrl = (endpoint: string, customBaseUrl?: string) => {
  if (customBaseUrl && endpoint) {
    return customBaseUrl + endpoint;
  }
  if (!customBaseUrl && endpoint) {
    return baseUrl + endpoint;
  }
  return '';
};

export const apiCall = async ({endpoint, header, method, payload}: Option) => {
  try {
    const userToken = AsyncStorage.getItem('token');
    const url = generateBaseUrl(endpoint);

    const accessToken = userToken ? `Bearer ${userToken}` : '';
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: accessToken,
      ...header,
    };
    const response = await fetch(url, {
      method: method,
      headers,
      body: (method !== 'GET' && JSON.stringify(payload)) || null,
    });
    const data = await response.json();
    if (!response.ok) {
      // Promise rejection will be handled on middleware
      // there is global error handler for redux thunk on middleware
      // use error handler logic there instead in here
      return Promise.reject(data);
    }
    return data;
  } catch (error) {
    throw new Error(error as any);
  }
};
