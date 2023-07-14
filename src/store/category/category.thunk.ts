import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const addCategory = thunkUtils({
  type: 'books/add',
  endpoint: endpoints.auth,
  method: 'POST',
});

export const getCategory = thunkUtils({
  type: 'books/list',
  endpoint: endpoints.buku,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const updateCategory = thunkUtils({
  type: 'books/update',
  endpoint: endpoints.buku,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const searchById = thunkUtils({
  type: 'books/update',
  endpoint: endpoints.buku,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const deleteCategory = thunkUtils({
  type: 'books/delete',
  endpoint: endpoints.buku,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});
