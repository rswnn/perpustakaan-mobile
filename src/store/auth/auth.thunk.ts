import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const studentLoginAction = thunkUtils({
  type: 'student/login',
  endpoint: `${endpoints.student}login`,
  method: 'POST',
});

export const teacherLoginAction = thunkUtils({
  type: 'teacher/login',
  endpoint: `${endpoints.teacher}login`,
  method: 'POST',
});
