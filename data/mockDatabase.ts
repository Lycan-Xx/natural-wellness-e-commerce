import { User } from '@/types/user';

// Pre-populated test users
export const mockUsers: User[] = [
  { id: '1', email: 'customer@example.com', password: 'Pass123!', role: 'customer', fullName: 'Mark Jonathan' },
  { id: '2', email: 'vendor@example.com', password: 'Pass123!', role: 'vendor', fullName: 'Rashida Musa' }
];

// Helper functions for mock database operations
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const createUser = (user: Omit<User, 'id'>): User => {
  const newUser: User = {
    ...user,
    id: (mockUsers.length + 1).toString()
  };
  mockUsers.push(newUser);
  return newUser;
};