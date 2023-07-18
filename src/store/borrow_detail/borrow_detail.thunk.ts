import {endpoints} from '@constants';
import {thunkUtils} from '@utils';

export const addPeminjam = thunkUtils({
  type: 'peminjaman-details/add',
  endpoint: endpoints.peminjam,
  method: 'POST',
});

export const getPeminjamDetailActionWithStatus = thunkUtils({
  type: 'peminjaman-details/list',
  endpoint: `${endpoints.peminjamDetail}?`,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const getPeminjamDetailAction = thunkUtils({
  type: 'peminjaman-details/list',
  endpoint: `${endpoints.peminjamDetail}?populate=*`,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const updateStatusAction = thunkUtils({
  type: 'peminjaman-details/update',
  endpoint: endpoints.peminjamDetail,
  method: 'PUT',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const searchByNis = thunkUtils({
  type: 'peminjaman-details/searchBook',
  endpoint: endpoints.peminjamDetail,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const deletePeminjam = thunkUtils({
  type: 'peminjaman-details/delete',
  endpoint: endpoints.peminjamDetail,
  method: 'DELETE',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});
