import {endpoints} from '@constants';

import {thunkUtils} from '@utils';

export const getTaskAction = thunkUtils({
  type: 'hafalan/list',
  endpoint: `${endpoints.task}list-hafalan`,
  method: 'GET',
});

export const getTaskByIdAction = thunkUtils({
  type: 'hafalan/data',
  endpoint: `${endpoints.task}`,
  method: 'GET',
});

export const getTaskByCategoryIdAction = thunkUtils({
  type: 'hafalan/category',
  endpoint: `${endpoints.task}`,
  method: 'GET',
});

export const getTaskByNisAndTaskId = thunkUtils({
  type: 'hafalan/result',
  endpoint: `${endpoints.detailTask}`,
  method: 'GET',
});

export const gradingTaskACtion = thunkUtils({
  type: 'perhafalan/grading',
  endpoint: `${endpoints.detailTask}grading/`,
  method: 'PUT',
});
