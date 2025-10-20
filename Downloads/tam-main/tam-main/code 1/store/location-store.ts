import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  timestamp: string;
}

export interface RouteData {
  distance: string;
  duration: string;
  polyline: string;
  steps: {
    instruction: string;
    distance: string;
    duration: string;
  }[];

}

export interface SharedLocation {
  id: string;
  senderId: string;
  receiverId: string;
  location: LocationData;
  isActive: boolean;
}

interface LocationState {
  currentLocation: LocationData | null;
  sharedLocations: SharedLocation[];
  isTrackingLocation: boolean;
  locationPermission: boolean;
  currentRoute: RouteData | null;
  isCalculatingRoute: boolean;
  
  requestLocationPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<LocationData | null>;
  startLocationTracking: () => Promise<void>;
  stopLocationTracking: () => void;
  shareLocation: (receiverId: string, senderId?: string) => Promise<string | null>;
  addSharedLocation: (sharedLocation: SharedLocation) => void;
  removeSharedLocation: (id: string) => void;
  updateCurrentLocation: (location: LocationData) => void;
  calculateRoute: (origin: LocationData, destination: LocationData) => Promise<RouteData | null>;
  clearRoute: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      currentLocation: null,
      sharedLocations: [],
      isTrackingLocation: false,
      locationPermission: false,
      currentRoute: null,
      isCalculatingRoute: false,
      
      requestLocationPermission: async () => {
        if (Platform.OS === 'web') {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            set({ locationPermission: true });
            return true;
          } catch (error) {
            console.log('Web geolocation permission denied:', error);
            set({ locationPermission: false });
            return false;
          }
        }
        
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          const granted = status === 'granted';
          set({ locationPermission: granted });
          return granted;
        } catch (error) {
          console.log('Location permission error:', error);
          set({ locationPermission: false });
          return false;
        }
      },
      
      getCurrentLocation: async () => {
        const { locationPermission } = get();
        if (!locationPermission) {
          const granted = await get().requestLocationPermission();
          if (!granted) return null;
        }
        
        try {
          if (Platform.OS === 'web') {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
              });
            });
            
            const locationData: LocationData = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: new Date().toISOString()
            };
            
            // Try to get address using reverse geocoding API
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
              );
              const data = await response.json();
              
              if (data && (data.locality || data.city || data.principalSubdivision)) {
                locationData.address = `${data.locality || data.city || ''} ${data.principalSubdivision || ''}`.trim();
              }
            } catch (error) {
              console.log('Web reverse geocoding failed:', error);
            }
            
            set({ currentLocation: locationData });
            return locationData;
          } else {
            const location = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
            });
            
            const locationData: LocationData = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              timestamp: new Date().toISOString()
            };
            
            // Try to get address
            try {
              const [address] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
              
              if (address) {
                locationData.address = `${address.street || ''} ${address.city || ''} ${address.region || ''}`.trim();
              }
            } catch (error) {
              console.log('Reverse geocoding failed:', error);
            }
            
            set({ currentLocation: locationData });
            return locationData;
          }
        } catch (error) {
          console.log('Get current location error:', error);
          return null;
        }
      },
      
      startLocationTracking: async () => {
        const { locationPermission } = get();
        if (!locationPermission) {
          const granted = await get().requestLocationPermission();
          if (!granted) return;
        }
        
        set({ isTrackingLocation: true });
        
        if (Platform.OS === 'web') {
          const watchId = navigator.geolocation.watchPosition(
            async (position) => {
              const locationData: LocationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: new Date().toISOString()
              };
              
              // Try to get address using reverse geocoding API for web tracking
              try {
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
                );
                const data = await response.json();
                
                if (data && (data.locality || data.city || data.principalSubdivision)) {
                  locationData.address = `${data.locality || data.city || ''} ${data.principalSubdivision || ''}`.trim();
                }
              } catch (error) {
                console.log('Web reverse geocoding failed:', error);
              }
              
              set({ currentLocation: locationData });
            },
            (error) => console.log('Location tracking error:', error),
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 5000
            }
          );
          
          // Store watchId for cleanup
          (get() as any).webWatchId = watchId;
        } else {
          try {
            await Location.watchPositionAsync(
              {
                accuracy: Location.Accuracy.High,
                timeInterval: 5000,
                distanceInterval: 10,
              },
              async (location) => {
                const locationData: LocationData = {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  timestamp: new Date().toISOString()
                };
                
                // Try to get address for mobile tracking
                try {
                  const [address] = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  });
                  
                  if (address) {
                    locationData.address = `${address.street || ''} ${address.city || ''} ${address.region || ''}`.trim();
                  }
                } catch (error) {
                  console.log('Mobile reverse geocoding failed:', error);
                }
                
                set({ currentLocation: locationData });
              }
            );
          } catch (error) {
            console.log('Location tracking error:', error);
            set({ isTrackingLocation: false });
          }
        }
      },
      
      stopLocationTracking: () => {
        set({ isTrackingLocation: false });
        
        if (Platform.OS === 'web') {
          const watchId = (get() as any).webWatchId;
          if (watchId) {
            navigator.geolocation.clearWatch(watchId);
          }
        }
      },
      
      shareLocation: async (receiverId: string, senderId?: string) => {
        const location = await get().getCurrentLocation();
        if (!location) return null;
        
        const sharedLocationId = `location_${Date.now()}`;
        const actualSenderId = senderId || 'current_user';
        const sharedLocation: SharedLocation = {
          id: sharedLocationId,
          senderId: actualSenderId,
          receiverId,
          location,
          isActive: true
        };
        
        get().addSharedLocation(sharedLocation);
        
        // Create deep link
        const deepLink = `taxiapp://location?id=${sharedLocationId}&lat=${location.latitude}&lng=${location.longitude}&sender=${actualSenderId}&receiver=${receiverId}`;
        return deepLink;
      },
      
      addSharedLocation: (sharedLocation) => {
        set(state => ({
          sharedLocations: [...state.sharedLocations, sharedLocation]
        }));
      },
      
      removeSharedLocation: (id) => {
        set(state => ({
          sharedLocations: state.sharedLocations.filter(loc => loc.id !== id)
        }));
      },
      
      updateCurrentLocation: (location) => {
        set({ currentLocation: location });
      },
      
      calculateRoute: async (origin: LocationData, destination: LocationData) => {
        set({ isCalculatingRoute: true });
        
        try {
          // Using Google Maps Directions API
          const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // In production, use environment variable
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;
          
          // For demo purposes, we'll simulate the API response
          // In production, you would make the actual API call
          const simulatedRoute: RouteData = {
            distance: `${(Math.random() * 10 + 1).toFixed(1)} km`,
            duration: `${Math.floor(Math.random() * 30 + 5)} min`,
            polyline: 'simulated_polyline_data',
            steps: [
              {
                instruction: 'Head north on KN 182 St',
                distance: '0.5 km',
                duration: '2 min'
              },
              {
                instruction: 'Turn right onto KN 190 St',
                distance: '1.2 km',
                duration: '4 min'
              },
              {
                instruction: 'Continue straight to destination',
                distance: '0.8 km',
                duration: '3 min'
              }
            ]
          };
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ currentRoute: simulatedRoute, isCalculatingRoute: false });
          return simulatedRoute;
        } catch (error) {
          console.log('Route calculation error:', error);
          set({ isCalculatingRoute: false });
          return null;
        }
      },
      
      clearRoute: () => {
        set({ currentRoute: null });
      },
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        sharedLocations: state.sharedLocations,
        locationPermission: state.locationPermission,
        currentRoute: state.currentRoute,
      }),
    }
  )
);