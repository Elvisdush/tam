import { User } from '@/types/user';
import { Ride } from '@/types/ride';

export interface DatabaseSchema {
  users: User[];
  rides: Ride[];
  messages: Message[];
  locations: Location[];
}

export interface Message {
  id: string;
  rideId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Location {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  accuracy?: number;
}

export interface DatabaseOperations {
  // User operations
  createUser: (user: Omit<User, 'id'>) => Promise<User>;
  getUser: (id: string) => Promise<User | null>;
  getUserByEmail: (email: string) => Promise<User | null>;
  updateUser: (id: string, updates: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;

  // Ride operations
  createRide: (ride: Omit<Ride, 'id'>) => Promise<Ride>;
  getRide: (id: string) => Promise<Ride | null>;
  getRidesByUser: (userId: string) => Promise<Ride[]>;
  getAvailableRides: () => Promise<Ride[]>;
  updateRide: (id: string, updates: Partial<Ride>) => Promise<Ride>;
  deleteRide: (id: string) => Promise<void>;

  // Message operations
  createMessage: (message: Omit<Message, 'id'>) => Promise<Message>;
  getMessagesByRide: (rideId: string) => Promise<Message[]>;
  markMessageAsRead: (id: string) => Promise<void>;

  // Location operations
  updateLocation: (location: Omit<Location, 'id'>) => Promise<Location>;
  getUserLocation: (userId: string) => Promise<Location | null>;
}
