import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatabaseSchema, DatabaseOperations, User, Ride, Message, Location } from './schema';

class Database implements DatabaseOperations {
  private readonly STORAGE_KEYS = {
    USERS: 'rideconnect_users',
    RIDES: 'rideconnect_rides',
    MESSAGES: 'rideconnect_messages',
    LOCATIONS: 'rideconnect_locations',
  };

  // Generic storage methods
  private async getData<T>(key: string): Promise<T[]> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error getting data for key ${key}:`, error);
      return [];
    }
  }

  private async setData<T>(key: string, data: T[]): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error setting data for key ${key}:`, error);
      throw error;
    }
  }

  // User operations
  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const users = await this.getData<User>(this.STORAGE_KEYS.USERS);
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    users.push(newUser);
    await this.setData(this.STORAGE_KEYS.USERS, users);
    return newUser;
  }

  async getUser(id: string): Promise<User | null> {
    const users = await this.getData<User>(this.STORAGE_KEYS.USERS);
    return users.find(user => user.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = await this.getData<User>(this.STORAGE_KEYS.USERS);
    return users.find(user => user.email === email) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const users = await this.getData<User>(this.STORAGE_KEYS.USERS);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');

    users[index] = { ...users[index], ...updates };
    await this.setData(this.STORAGE_KEYS.USERS, users);
    return users[index];
  }

  async deleteUser(id: string): Promise<void> {
    const users = await this.getData<User>(this.STORAGE_KEYS.USERS);
    const filteredUsers = users.filter(user => user.id !== id);
    await this.setData(this.STORAGE_KEYS.USERS, filteredUsers);
  }

  // Ride operations
  async createRide(rideData: Omit<Ride, 'id'>): Promise<Ride> {
    const rides = await this.getData<Ride>(this.STORAGE_KEYS.RIDES);
    const newRide: Ride = {
      ...rideData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    rides.push(newRide);
    await this.setData(this.STORAGE_KEYS.RIDES, rides);
    return newRide;
  }

  async getRide(id: string): Promise<Ride | null> {
    const rides = await this.getData<Ride>(this.STORAGE_KEYS.RIDES);
    return rides.find(ride => ride.id.toString() === id) || null;
  }

  async getRidesByUser(userId: string): Promise<Ride[]> {
    const rides = await this.getData<Ride>(this.STORAGE_KEYS.RIDES);
    return rides.filter(ride =>
      ride.driverId === userId || ride.passengerId === userId
    );
  }

  async getAvailableRides(): Promise<Ride[]> {
    const rides = await this.getData<Ride>(this.STORAGE_KEYS.RIDES);
    return rides.filter(ride =>
      ride.status === 'pending' && ride.driverId === null
    );
  }

  async updateRide(id: string, updates: Partial<Ride>): Promise<Ride> {
    const rides = await this.getData<Ride>(this.STORAGE_KEYS.RIDES);
    const index = rides.findIndex(ride => ride.id.toString() === id);
    if (index === -1) throw new Error('Ride not found');

    rides[index] = { ...rides[index], ...updates };
    await this.setData(this.STORAGE_KEYS.RIDES, rides);
    return rides[index];
  }

  async deleteRide(id: string): Promise<void> {
    const rides = await this.getData<Ride>(this.STORAGE_KEYS.RIDES);
    const filteredRides = rides.filter(ride => ride.id.toString() !== id);
    await this.setData(this.STORAGE_KEYS.RIDES, filteredRides);
  }

  // Message operations
  async createMessage(messageData: Omit<Message, 'id'>): Promise<Message> {
    const messages = await this.getData<Message>(this.STORAGE_KEYS.MESSAGES);
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    messages.push(newMessage);
    await this.setData(this.STORAGE_KEYS.MESSAGES, messages);
    return newMessage;
  }

  async getMessagesByRide(rideId: string): Promise<Message[]> {
    const messages = await this.getData<Message>(this.STORAGE_KEYS.MESSAGES);
    return messages.filter(message => message.rideId === rideId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  async markMessageAsRead(id: string): Promise<void> {
    const messages = await this.getData<Message>(this.STORAGE_KEYS.MESSAGES);
    const index = messages.findIndex(message => message.id === id);
    if (index !== -1) {
      messages[index].read = true;
      await this.setData(this.STORAGE_KEYS.MESSAGES, messages);
    }
  }

  // Location operations
  async updateLocation(locationData: Omit<Location, 'id'>): Promise<Location> {
    const locations = await this.getData<Location>(this.STORAGE_KEYS.LOCATIONS);
    const existingIndex = locations.findIndex(loc => loc.userId === locationData.userId);

    const newLocation: Location = {
      ...locationData,
      id: Date.now().toString(),
    };

    if (existingIndex !== -1) {
      locations[existingIndex] = newLocation;
    } else {
      locations.push(newLocation);
    }

    await this.setData(this.STORAGE_KEYS.LOCATIONS, locations);
    return newLocation;
  }

  async getUserLocation(userId: string): Promise<Location | null> {
    const locations = await this.getData<Location>(this.STORAGE_KEYS.LOCATIONS);
    return locations.find(location => location.userId === userId) || null;
  }

  // Utility methods
  async clearAllData(): Promise<void> {
    const keys = Object.values(this.STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
  }

  async getAllUsers(): Promise<User[]> {
    return this.getData<User>(this.STORAGE_KEYS.USERS);
  }

  async getAllRides(): Promise<Ride[]> {
    return this.getData<Ride>(this.STORAGE_KEYS.RIDES);
  }
}

// Export singleton instance
export const database = new Database();
export default database;
