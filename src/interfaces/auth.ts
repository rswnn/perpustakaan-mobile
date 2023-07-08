export interface AuthResponseType {
  jwt: string;
  user: UserType;
  isLoggedIn?: boolean;
  loading: boolean;
  error?: any;
}

export interface AuthPayload {
  identifier: string;
  password: string;
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
