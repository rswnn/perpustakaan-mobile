import {endpoints} from '@constants';
import {thunkUtils} from '@utils';

export const addPeminjam = thunkUtils({
  type: 'pinjamen/add',
  endpoint: endpoints.peminjam,
  method: 'POST',
});

export const getPeminjam = thunkUtils({
  type: 'pinjamen/list',
  endpoint: endpoints.peminjam,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const updatePeminjam = thunkUtils({
  type: 'pinjamen/update',
  endpoint: endpoints.peminjam,
  method: 'PUT',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const searchByNis = thunkUtils({
  type: 'pinjamen/searchBook',
  endpoint: endpoints.peminjam,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const deletePeminjam = thunkUtils({
  type: 'pinjamen/delete',
  endpoint: endpoints.peminjam,
  method: 'DELETE',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});
