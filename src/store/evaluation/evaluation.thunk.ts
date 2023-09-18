import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const getDetailTaskAction = thunkUtils({
  type: 'student/login',
  endpoint: endpoints.detailTask,
  method: 'GET',
});

// export const studentSubmitHafalan = thunkUtils({
//   type: 'student/login',
//   endpoint: `${endpoints.student}login`,
//   method: 'POST',
// });
