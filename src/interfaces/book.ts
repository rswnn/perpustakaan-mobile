import {LoadingType, ResponseStatus} from './network';

export interface BookResponseType {
  id: number;
  attributes: BookDetail;
}

export interface BookState {
  books: BookDetail[];
  loadingBook: LoadingType;
  error: ResponseStatus;
  searchByKode?: string | null;
}
export interface BookDetail {
  kode_buku: string;
  judul_buku: string;
  nama_penulis: string;
  nama_penerbit: string;
  tahun_terbit: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
