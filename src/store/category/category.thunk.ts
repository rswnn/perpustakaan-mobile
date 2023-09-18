import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const getCategoryAction = thunkUtils({
  type: 'category/list',
  endpoint: `${endpoints.category}list`,
  method: 'GET',
});

export const getCategoryByIdAction = thunkUtils({
  type: 'category/list',
  endpoint: `${endpoints.category}/id`,
  method: 'GET',
});
