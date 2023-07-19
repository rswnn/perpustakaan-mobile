import {LoadingType, ResponseStatus} from './network';

export interface BorrowState {
  borrows: Borrow[];
  loadingBorrow: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
}

export interface Borrow {
  id: number;
  attributes: BorrowDetail;
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
