import {LoadingType, ResponseStatus} from './network';

export interface TaskState {
  tasks?: Task[] | null;
  loadingTask: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
  taskResult?: TaskResult;
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

export interface TaskType {
  id: number;
  title: string;
  image_media: string;
  media_reader: string;
  category_id: number;
}
