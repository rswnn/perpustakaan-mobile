import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const loginAction = thunkUtils({
  type: 'auth/login',
  endpoint: endpoints.auth,
  method: 'POST',
});
