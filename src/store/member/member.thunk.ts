import {endpoints} from '@constants';
import {thunkUtils} from '@utils';

export const addMember = thunkUtils({
  type: 'anggotas/add',
  endpoint: endpoints.anggota,
  method: 'POST',
});

export const getMember = thunkUtils({
  type: 'anggotas/list',
  endpoint: endpoints.anggota,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const updateMember = thunkUtils({
  type: 'anggotas/update',
  endpoint: endpoints.anggota,
  method: 'PUT',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const searchByNis = thunkUtils({
  type: 'anggota/searchBook',
  endpoint: endpoints.buku,
  method: 'GET',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});

export const deleteMember = thunkUtils({
  type: 'anggota/delete',
  endpoint: endpoints.anggota,
  method: 'DELETE',
  onFailed: ({error}) => {
    if (error) {
      console.log(error, 'aaa');
    }
  },
});
