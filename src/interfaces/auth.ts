export interface AuthResponseType {
  token: string;
  user: {
    nip: AuthTeacherType | null;
    nis: AuthStudentType | null;
  };
  isLoggedIn?: boolean;
  loading: boolean;
  loginType: string;
  error?: any;
}

export interface AuthStudentType {
  nis: string;
  fullName: string;
  gender: string;
  alamat: string;
  // loginType: string;
}

export interface AuthTeacherType {
  nip: string;
  fullName: string;
  gender: string;
  alamat: string;
  // loginType: string;
}
