export interface PetResponse {
  id: string;
  age: number;
  name: string;
  userId: string;
  user?: User; // user có thể là null hoặc undefined
}

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  role: string;
  pets?: PetResponse[];
}

export interface CreateUserInput {
  name: string;
  age: number;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  id: string;
  name?: string;
  age?: number;
  email?: string;
  password?: string;
}

export interface ListUsersData {
  listUser: User[];
}

export interface CreateUserData {
  createUser: User;
}

export interface UpdateUserData {
  updateUser: User;
}

export interface DeleteUserData {
  deleteUser: User;
}

export interface DestroyUserData {
  destroyUser: User;
}

export interface CreateUserVars {
  input: CreateUserInput;
}

export interface UpdateUserVars {
  input: UpdateUserInput;
}

export interface DeleteUserVars {
  userId: string;
}

export interface DestroyUserVars {
  userId: string;
}
