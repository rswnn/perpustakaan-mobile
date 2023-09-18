import {LoadingType, ResponseStatus} from './network';

export interface StudentState {
  student?: Student[];
  loadingStudent: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
}

export interface Student {
  nis: string;
  attributes: StudentType;
  loading: boolean;
}

export interface StudentType {
  nis: string;
  fullName: string;
  gender: string;
  alamat: string;
}
