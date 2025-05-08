export type UserRole = 'customer' | 'vendor';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  fullName: string;
}