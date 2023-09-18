import {LoadingType, ResponseStatus} from './network';

export interface TeacherState {
  teacher?: Teacher[] | null;
  loadingTeacher: LoadingType;
  error: ResponseStatus;
  searchByNip?: string | null;
}

export interface Teacher {
  nip: string;
  attributes: TeacherType;
  loading: boolean;
}

export interface TeacherType {
  nip: string;
  fullName: string;
  gender: string;
  alamat: string;
}
