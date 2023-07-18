import {LoadingType, ResponseStatus} from './network';

export interface MemberState {
  member: Member[];
  loadingMember: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
}

export interface Member {
  id: number;
  attributes: MemberDetail;
  loading: boolean;
}

export interface MemberDetail {
  nis: string;
  nama_siswa: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  no_hp: string;
  alamat: string;
  tanggal_lahir: string;
}
