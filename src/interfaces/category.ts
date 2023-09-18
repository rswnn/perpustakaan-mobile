import {LoadingType, ResponseStatus} from './network';

// export interface Category {
//   id: number;
//   attributes: CategoryType;
//   loading: boolean;
// }

// token: string;
//   user: AuthStudentType | AuthTeacherType;
//   isLoggedIn?: boolean;
//   loading: boolean;
//   loginType: string;
//   error?: any;

export interface CategoryState {
  categories: CategoryType[];
  loadingCategory: LoadingType;
  error: ResponseStatus;
  searchById: string | null;
  loading: false;
}
export interface CategoryType {
  id: number;
  category_name: string;
  createdAt: string;
  updatedAt: string;
}
