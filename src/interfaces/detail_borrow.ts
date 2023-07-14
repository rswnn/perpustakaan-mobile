export interface DetailBorrowRespponse {
  data?: DetailBorrow[] | null;
}
export interface DetailBorrow {
  id: number;
  attributes: DetailBorrowAttributes;
}
export interface DetailBorrowAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
