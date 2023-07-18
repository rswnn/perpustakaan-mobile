import {LoadingType, ResponseStatus} from './network';

export interface DetailBorrowState {
  detailBorrows: DetailBorrowRes[];
  loadingBorrow: LoadingType;
  error: ResponseStatus;
  searchByNis?: string | null;
}
export interface DetailBorrowRes {
  id: number;
  attributes: DetailBorrow;
  loading: boolean;
}
export interface DetailBorrow {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
