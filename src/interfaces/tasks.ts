import {LoadingType, ResponseStatus} from './network';

export interface TaskState {
  tasks?: Task[] | null;
  loadingTask: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
}

export interface Task {
  id: string;
  attributes: TaskType;
  loading: boolean;
}

export interface TaskType {
  id: number;
  title: string;
  image_media: string;
  media_reader: string;
  category_id: number;
}
