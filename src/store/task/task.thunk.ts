import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const getTaskAction = thunkUtils({
  type: 'hafalan/list',
  endpoint: `${endpoints.task}list-hafalan`,
  method: 'GET',
});

export const getTaskByIdAction = thunkUtils({
  type: 'hafalan/login',
  endpoint: `${endpoints.task}list-hafalan/`,
  method: 'GET',
});
