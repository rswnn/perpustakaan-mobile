import {LoadingType, ResponseStatus} from './network';
export interface DetailTaskState {
  detailTask?: DetailTask[];
  loadingTaskDetail: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
}

export interface DetailTask {
  id: string;
  attributes: DetailTaskType;
  loading: boolean;
}

export interface DetailTaskType {
  id: number;
  grade: number;
  record: string;
  createdAt: string;
  updatedAt: string;
  nis: string;
  hafalan_id: number;
}
