import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const getStudentAction = thunkUtils({
  type: 'student/list',
  endpoint: endpoints.student,
  method: 'GET',
});

export const getStudentByClasscode = thunkUtils({
  type: 'student/login',
  endpoint: `${endpoints.student}list/`,
  method: 'GET',
});
