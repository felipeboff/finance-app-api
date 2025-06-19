export interface CreateUserDTO {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}
