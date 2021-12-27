export type Classroom = {
  id: number;
  name: string;
  description: string;
  maxStudents: number;
  manager: User;
  students: User[];
  updated_at: string;
  tutorials: Tutorial[];
};

export type Tutorial = {
  id: number;
  title: string;
  slug: string;
  classroom: number;
  summary?: string;
  coverImage?: string;
  contents?: string;
  url?: string;
  updated_at: string;
  type: 'text';
};

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

export type APIResponse = {
  data: {
    id: number;
    attributes: Record<string, any>;
  };
};
