export type UserRole = 'customer' | 'vendor';
export type Gender = 'male' | 'female';

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  gender?: Gender;
}