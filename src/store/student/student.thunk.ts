import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const getStudentAction = thunkUtils({
  type: 'student/list',
  endpoint: endpoints.student,
  method: 'GET',
});

export const getStudentByClasscode = thunkUtils({
  type: 'student/list',
  endpoint: `${endpoints.student}list/`,
  method: 'GET',
});

export const getStudentByNisAction = thunkUtils({
  type: 'student/find',
  endpoint: `${endpoints.student}find/`,
  method: 'GET',
});
