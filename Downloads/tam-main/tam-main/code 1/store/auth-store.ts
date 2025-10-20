import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';
import { mockUsers } from '@/mocks/users';

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => void;
  register: (userData: Omit<User, 'id'>) => void;
  updateUser: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: mockUsers,
      isAuthenticated: false,
      
      signIn: (email, password) => {
        const users = get().users;
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          set({ user, isAuthenticated: true });
        }
      },
      
      register: (userData) => {
        const newUser = {
          id: Date.now().toString(),
          ...userData,
        };
        
        set(state => ({
          users: [...state.users, newUser],
          user: newUser,
          isAuthenticated: true,
        }));
      },
      
      updateUser: (userData) => {
        set(state => ({
          users: state.users.map(u => u.id === userData.id ? userData : u),
          user: userData,
        }));
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);