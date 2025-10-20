import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ride } from '@/types/ride';
import { mockRides } from '@/mocks/rides';

interface RideState {
  rides: Ride[];
  searchResults: Ride[];
  lastSearchParams: {
    from: string;
    to: string;
    price?: number;
    transportType: 'car' | 'motorbike';
  } | null;
  searchRides: (from: string, to: string, price?: number, transportType?: 'car' | 'motorbike') => void;
  addRide: (ride: Ride) => void;
  acceptRide: (rideId: number) => void;
}

export const useRideStore = create<RideState>()(
  persist(
    (set, get) => ({
      rides: mockRides,
      searchResults: [],
      lastSearchParams: null,
      
      searchRides: (from, to, price, transportType = 'motorbike') => {
        const rides = get().rides;
        
        // Store search parameters
        set({ 
          lastSearchParams: { from, to, price, transportType }
        });
        
        let results = rides.filter(ride => 
          ride.from.toLowerCase().includes(from.toLowerCase()) &&
          ride.to.toLowerCase().includes(to.toLowerCase()) &&
          (transportType ? ride.transportType === transportType : true)
        );
        
        if (price) {
          // Sort by price closest to the requested price
          results = results.sort((a, b) => 
            Math.abs(a.price - price) - Math.abs(b.price - price)
          );
        }
        
        set({ searchResults: results });
      },
      
      addRide: (ride) => {
        set(state => ({
          rides: [...state.rides, ride],
        }));
      },
      
      acceptRide: (rideId) => {
        set(state => ({
          rides: state.rides.map(ride => 
            ride.id === rideId ? { ...ride, status: 'accepted' } : ride
          ),
        }));
      },
    }),
    {
      name: 'ride-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);