import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const addBooks = thunkUtils({
  type: 'books/add',
  endpoint: endpoints.buku,
  method: 'POST',
});

export const getBooks = thunkUtils({
  type: 'books/list',
  endpoint: `${endpoints.buku}?populate=*`,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const updateBooks = thunkUtils({
  type: 'books/update',
  endpoint: endpoints.buku,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const searchByKode = thunkUtils({
  type: 'books/update',
  endpoint: endpoints.buku,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const deleteBooks = thunkUtils({
  type: 'books/delete',
  endpoint: endpoints.buku,
  method: 'DELETE',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});
