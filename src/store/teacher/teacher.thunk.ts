import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

// export const teacherLoginAction = thunkUtils({
//   type: 'student/login',
//   endpoint: `${endpoints.teacher}login`,
//   method: 'POST',
// });

export const getTeacherAction = thunkUtils({
  type: 'teacher/list',
  endpoint: `${endpoints.teacher}list`,
  method: 'GET',
});

export const getTeacherByNipAction = thunkUtils({
  type: 'teacher/list',
  endpoint: `${endpoints.teacher}list/`,
  method: 'GET',
});
