export interface AuthResponseType {
  jwt: string;
  user: UserType;
  isLoggedIn?: boolean;
}
export interface UserType {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}
