import {LoadingType, ResponseStatus} from './network';

export interface Category {
  id: number;
  attributes: CategoryDetail;
}

export interface CategoryState {
  categories: CategoryDetail[];
  loadingCategory: LoadingType;
  error: ResponseStatus;
  searchById: string | null;
}
export interface CategoryDetail {
  kode_kategori: string;
  kategori_buku: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
