import {LoadingType, ResponseStatus} from './network';

export interface TaskState {
  tasks?: Task[] | null;
  loadingTask: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
  taskResult?: TaskResult;
  listTasks: ListTasks[];
}

export interface Task {
  id: number;
  category_id: number;
  createdAt: string;
  image_media: string;
  media_reader: string;
  title: string;
  updatedAt: string;
}
export interface TaskResult {
  id: number;
  grade?: null;
  record: string;
  createdAt: string;
  updatedAt: string;
  nis: string;
  hafalan_id: number;
}

export interface ListTasks {
  id: number;
  title: string;
  image_media?: null;
  media_reader?: string;
  category_id?: number;
  createdAt?: string;
  updatedAt?: string;
  grade?: string;
}

export interface TaskType {
  id: number;
  title: string;
  image_media: string;
  media_reader: string;
  category_id: number;
}
