export type User = {
  id: number;
  email: string;
  provider: 'local' | 'github';
  role: UserRole;
};

export type UserSigninData = {
  identifier: string;
  password: string;
};

export type UserSigninResponse = {
  jwt: string;
  user: User;
};

export type UserSignupData = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type UserSignupResponse = UserSigninResponse;

type UserRole = {
  name: string;
  type: string;
};
