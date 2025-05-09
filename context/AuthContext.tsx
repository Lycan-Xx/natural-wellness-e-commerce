import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { User, UserRole } from '@/types/user';
import { findUserByEmail, createUser } from '@/data/mockDatabase';

interface AuthState {
  user: Omit<User, 'password'> | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<Omit<User, 'password'>>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This hook can be used to access the user info.
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: Omit<User, 'password'> | null) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inVendorGroup = segments[0] === '(vendor)';
    
    // Use a timeout to ensure navigation doesn't happen during render
    const timer = setTimeout(() => {
      if (!user && !inAuthGroup) {
        // Redirect to the sign-in page
        router.replace('/(auth)');
      } else if (user) {
        if (inAuthGroup) {
          // Redirect away from auth group pages if authenticated
          if (user.role === 'vendor') {
            router.replace('/(vendor)');
          } else {
            router.replace('/(tabs)');
          }
        } else if (inVendorGroup && user.role !== 'vendor') {
          // Redirect away from vendor pages if not a vendor
          router.replace('/(tabs)');
        } else if (!inVendorGroup && !inAuthGroup && user.role === 'vendor') {
          // Redirect to vendor pages if vendor tries to access customer pages
          router.replace('/(vendor)');
        }
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
  });

  useProtectedRoute(state.user);

  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = findUserByEmail(email);
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = user;
      setState({ user: userWithoutPassword, isLoading: false });
      return userWithoutPassword;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string, role: UserRole) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const existingUser = findUserByEmail(email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const newUser = createUser({ email, password, fullName, role });
      const { password: _, ...userWithoutPassword } = newUser;
      setState({ user: userWithoutPassword, isLoading: false });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const signOut = useCallback(() => {
    setState({ user: null, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}