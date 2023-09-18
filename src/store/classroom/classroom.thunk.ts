import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const getClassroomAction = thunkUtils({
  type: 'classRoom/list',
  endpoint: `${endpoints.classroom}list`,
  method: 'GET',
});

export const getClassroomByKodeKelasAction = thunkUtils({
  type: 'classRoom/list',
  endpoint: `${endpoints.student}list/`,
  method: 'GET',
});

export const getClassroomByNipAction = thunkUtils({
  type: 'classRoom/list',
  endpoint: `${endpoints.classroom}list/`,
  method: 'GET',
});
