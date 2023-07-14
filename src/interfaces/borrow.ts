import {LoadingType, ResponseStatus} from './network';

export interface Borrow {
  id: number;
  attributes: BorrowDetail;
}

export interface BorrowState {
  borrows: BorrowDetail[];
  loadingBorrow: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
}
export interface BorrowDetail {
  tgl_pinjam: string;
  tgl_kembali: string;
  status: string;
  lama_pinjam: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
