import {LoadingType, ResponseStatus} from './network';

export interface StudentState {
  student?: Student | null;
  loadingStudent: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
}
export interface Student {
  fullName: string;
  alamat: string;
  gender: string;
  password: string;
  classrooms: ClassDetail[] | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  students?: StudentsEntity[] | null;
}
export interface StudentsEntity {
  nis: string;
  fullName: string;
  alamat: string;
  gender: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  class_detail: ClassDetail;
}
export interface ClassDetail {
  kode_kelas: string;
  nama_kelas: string;
}
