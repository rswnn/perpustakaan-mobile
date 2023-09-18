import {LoadingType, ResponseStatus} from './network';

export interface ClassroomState {
  classroom?: ClassroomType[];
  loadingClass: LoadingType;
  error: ResponseStatus;
  loading: false;
  searchByKodeKelas?: string | null;
}

export interface ClassroomType {
  kode_kelas: string;
  nama_kelas: string;
  status: string;
}
