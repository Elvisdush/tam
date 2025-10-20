import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Mic, Navigation, MapPin, Users, Route, Clock, ArrowRight, X } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import { useLocationStore } from '@/store/location-store';
import { useAuthStore } from '@/store/auth-store';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const params = useLocalSearchParams();
  const { showLocation, latitude, longitude, senderId, address } = params;
  const [showDirections, setShowDirections] = useState(false);
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  
  const { 
    currentLocation, 
    startLocationTracking, 
    sharedLocations, 
    currentRoute, 
    isCalculatingRoute,
    calculateRoute,
    clearRoute
  } = useLocationStore();
  const user = useAuthStore(state => state.user);
  
  const sharedLat = latitude ? parseFloat(latitude as string) : null;
  const sharedLng = longitude ? parseFloat(longitude as string) : null;
  
  useEffect(() => {
    // Start location tracking when map opens
    startLocationTracking();
    
    // If showing a shared location, calculate route
    if (showLocation === 'true' && sharedLat && sharedLng && currentLocation) {
      const destination = {
        latitude: sharedLat,
        longitude: sharedLng,
        timestamp: new Date().toISOString(),
        address: address as string
      };
      
      calculateRoute(currentLocation, destination).then((route) => {
        if (route) {
          setShowDirections(true);
        }
      });
    }
  }, [showLocation, sharedLat, sharedLng, currentLocation]);
  
  useEffect(() => {
    // Clear route when component unmounts or when not showing location
    return () => {
      if (showLocation !== 'true') {
        clearRoute();
      }
    };
  }, [showLocation]);
  
  const handleGetDirections = async () => {
    if (sharedLat && sharedLng && currentLocation) {
      const destination = {
        latitude: sharedLat,
        longitude: sharedLng,
        timestamp: new Date().toISOString(),
        address: address as string
      };
      
      const route = await calculateRoute(currentLocation, destination);
      if (route) {
        setShowDirections(true);
      } else {
        Alert.alert('Error', 'Could not calculate route. Please try again.');
      }
    } else if (!currentLocation) {
      Alert.alert('Location Required', 'Please enable location services to get directions.');
    }
  };
  
  const handleShowRouteDetails = () => {
    setShowRouteDetails(true);
  };
  
  const handleCloseRouteDetails = () => {
    setShowRouteDetails(false);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.mapContainer}>
        {/* Dark Map Background */}
        <View style={styles.mapBackground}>
          {/* Street Lines */}
          <View style={[styles.streetLine, { top: '20%', left: '10%', width: '80%', transform: [{ rotate: '15deg' }] }]} />
          <View style={[styles.streetLine, { top: '35%', left: '5%', width: '90%', transform: [{ rotate: '-10deg' }] }]} />
          <View style={[styles.streetLine, { top: '50%', left: '0%', width: '100%', transform: [{ rotate: '5deg' }] }]} />
          <View style={[styles.streetLine, { top: '65%', left: '15%', width: '70%', transform: [{ rotate: '-20deg' }] }]} />
          <View style={[styles.streetLine, { top: '80%', left: '20%', width: '60%', transform: [{ rotate: '25deg' }] }]} />
          
          {/* Vertical Streets */}
          <View style={[styles.streetLine, { top: '10%', left: '25%', height: '80%', width: 2, transform: [{ rotate: '10deg' }] }]} />
          <View style={[styles.streetLine, { top: '15%', left: '50%', height: '70%', width: 2, transform: [{ rotate: '-5deg' }] }]} />
          <View style={[styles.streetLine, { top: '20%', left: '75%', height: '60%', width: 2, transform: [{ rotate: '15deg' }] }]} />
          
          {/* Street Names */}
          <Text style={[styles.streetName, { top: '15%', left: '15%', transform: [{ rotate: '15deg' }] }]}>KN 182 St</Text>
          <Text style={[styles.streetName, { top: '30%', left: '60%', transform: [{ rotate: '-10deg' }] }]}>KN 190 St</Text>
          <Text style={[styles.streetName, { top: '45%', left: '25%', transform: [{ rotate: '5deg' }] }]}>KN 173 St</Text>
          <Text style={[styles.streetName, { top: '60%', left: '70%', transform: [{ rotate: '-20deg' }] }]}>KN 204 St</Text>
          <Text style={[styles.streetName, { top: '75%', left: '40%', transform: [{ rotate: '25deg' }] }]}>KN 202 St</Text>
          <Text style={[styles.streetName, { top: '85%', left: '10%' }]}>KN 18 Av</Text>
          
          {/* Vertical Street Names */}
          <Text style={[styles.streetName, { top: '25%', left: '20%', transform: [{ rotate: '90deg' }] }]}>KN 168 St</Text>
          <Text style={[styles.streetName, { top: '40%', left: '45%', transform: [{ rotate: '85deg' }] }]}>KN 69 St</Text>
          <Text style={[styles.streetName, { top: '35%', left: '70%', transform: [{ rotate: '105deg' }] }]}>KN 173 St</Text>
          
          {/* Location Labels */}
          <View style={[styles.locationLabel, { top: '25%', left: '10%' }]}>
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>Merez</Text>
          </View>
          
          <View style={[styles.locationLabel, { top: '20%', right: '15%' }]}>
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>Engen{"\n"}Fuel Station</Text>
          </View>
          
          <View style={[styles.locationLabel, { top: '35%', right: '20%' }]}>
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>Fuel{"\n"}Station</Text>
          </View>
          
          <View style={[styles.locationLabel, { bottom: '25%', right: '15%' }]}>
            <Text style={styles.areaName}>Kigali</Text>
          </View>
          
          {/* User Location */}
          <View style={[styles.userLocation, { top: currentLocation ? '55%' : '55%', left: currentLocation ? '50%' : '50%' }]}>
            <View style={styles.userLocationDot} />
            <View style={styles.userLocationPulse} />
          </View>
          
          {/* Shared Location */}
          {showLocation === 'true' && sharedLat && sharedLng && (
            <View style={[styles.sharedLocation, { 
              top: `${30 + (sharedLat - (-1.9441)) * 100}%`, 
              left: `${20 + (sharedLng - 30.0619) * 100}%` 
            }]}>
              <View style={styles.sharedLocationDot} />
              <Text style={styles.sharedLocationLabel}>{senderId === user?.id ? 'You' : address}</Text>
            </View>
          )}
          
          {/* Route Line */}
          {showDirections && sharedLat && sharedLng && currentRoute && (
            <>
              <View style={styles.routeLine} />
              {/* Route waypoints */}
              <View style={[styles.routeWaypoint, { top: '45%', left: '40%' }]} />
              <View style={[styles.routeWaypoint, { top: '35%', left: '60%' }]} />
              <View style={[styles.routeWaypoint, { top: '25%', left: '70%' }]} />
            </>
          )}
          
          {/* Navigation Compass */}
          <View style={styles.compass}>
            <View style={styles.compassCircle}>
              <View style={styles.compassArrow} />
            </View>
          </View>
        </View>
        
        {/* Location Info Panel */}
        {showLocation === 'true' && sharedLat && sharedLng && (
          <View style={styles.locationInfoPanel}>
            <View style={styles.locationHeader}>
              <MapPin color="#007AFF" size={20} />
              <Text style={styles.locationTitle}>{address || 'Shared Location'}</Text>
            </View>
            <Text style={styles.locationSubtitle}>
              Shared by {senderId === user?.id ? 'You' : 'Contact'}
            </Text>
            {isCalculatingRoute && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#007AFF" />
                <Text style={styles.loadingText}>Calculating route...</Text>
              </View>
            )}
            {showDirections && currentRoute && (
              <View style={styles.routeInfo}>
                <View style={styles.routeDetail}>
                  <Route color="#666" size={16} />
                  <Text style={styles.routeText}>{currentRoute.distance}</Text>
                </View>
                <View style={styles.routeDetail}>
                  <Clock color="#666" size={16} />
                  <Text style={styles.routeText}>{currentRoute.duration}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.routeDetailsButton}
                  onPress={handleShowRouteDetails}
                >
                  <Text style={styles.routeDetailsButtonText}>View Steps</Text>
                  <ArrowRight color="#007AFF" size={14} />
                </TouchableOpacity>
              </View>
            )}
            {!showDirections && !isCalculatingRoute && (
              <TouchableOpacity style={styles.directionsButton} onPress={handleGetDirections}>
                <Navigation color="white" size={16} />
                <Text style={styles.directionsButtonText}>Get Directions</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        {/* Search Bar */}
        {showLocation !== 'true' && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Where to?"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic color="white" size={20} />
            </TouchableOpacity>
          </View>
        )}
        
        {/* Real-time Location Indicator */}
        {currentLocation && (
          <View style={styles.locationStatus}>
            <View style={styles.locationStatusDot} />
            <Text style={styles.locationStatusText}>Live Location</Text>
            <Text style={styles.locationCoords}>
              {currentLocation.address || `${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`}
            </Text>
          </View>
        )}
        
        {/* Route Details Modal */}
        {showRouteDetails && currentRoute && (
          <View style={styles.routeDetailsModal}>
            <View style={styles.routeDetailsContent}>
              <View style={styles.routeDetailsHeader}>
                <Text style={styles.routeDetailsTitle}>Route Details</Text>
                <TouchableOpacity onPress={handleCloseRouteDetails}>
                  <X color="#666" size={24} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.routeSummary}>
                <View style={styles.routeSummaryItem}>
                  <Route color="#007AFF" size={20} />
                  <Text style={styles.routeSummaryText}>{currentRoute.distance}</Text>
                </View>
                <View style={styles.routeSummaryItem}>
                  <Clock color="#007AFF" size={20} />
                  <Text style={styles.routeSummaryText}>{currentRoute.duration}</Text>
                </View>
              </View>
              
              <ScrollView style={styles.routeStepsContainer}>
                {currentRoute.steps.map((step, index) => (
                  <View key={index} style={styles.routeStep}>
                    <View style={styles.routeStepNumber}>
                      <Text style={styles.routeStepNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.routeStepContent}>
                      <Text style={styles.routeStepInstruction}>{step.instruction}</Text>
                      <View style={styles.routeStepDetails}>
                        <Text style={styles.routeStepDistance}>{step.distance}</Text>
                        <Text style={styles.routeStepDuration}>• {step.duration}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#2c3e50',
    position: 'relative',
  },
  streetLine: {
    position: 'absolute',
    backgroundColor: '#4a5568',
    height: 2,
  },
  streetName: {
    position: 'absolute',
    fontSize: 11,
    color: '#a0aec0',
    fontWeight: '500',
  },
  locationLabel: {
    position: 'absolute',
    alignItems: 'center',
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4299e1',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 10,
    color: '#e2e8f0',
    textAlign: 'center',
    fontWeight: '500',
  },
  areaName: {
    fontSize: 16,
    color: '#e2e8f0',
    fontWeight: '600',
  },
  userLocation: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLocationDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3182ce',
    borderWidth: 3,
    borderColor: 'white',
    zIndex: 2,
  },
  userLocationPulse: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(49, 130, 206, 0.3)',
    zIndex: 1,
  },
  compass: {
    position: 'absolute',
    bottom: 120,
    left: 20,
  },
  compassCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  compassArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#e53e3e',
  },
  searchContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 8,
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sharedLocation: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharedLocationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ff4444',
    borderWidth: 3,
    borderColor: 'white',
    zIndex: 2,
  },
  sharedLocationLabel: {
    fontSize: 10,
    color: '#e2e8f0',
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  routeLine: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    width: 200,
    height: 2,
    backgroundColor: '#007AFF',
    transform: [{ rotate: '45deg' }],
    opacity: 0.8,
  },
  locationInfoPanel: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  locationSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  routeInfo: {
    flexDirection: 'row',
    gap: 20,
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  routeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  directionsButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    gap: 8,
  },
  directionsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  locationStatus: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    minWidth: 120,
  },
  locationStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  locationStatusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  locationCoords: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    marginTop: 2,
  },
  routeWaypoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: 'white',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  routeDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  routeDetailsButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  routeDetailsModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  routeDetailsContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingTop: 20,
  },
  routeDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  routeDetailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  routeSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  routeSummaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeSummaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  routeStepsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  routeStep: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  routeStepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  routeStepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  routeStepContent: {
    flex: 1,
  },
  routeStepInstruction: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  routeStepDetails: {
    flexDirection: 'row',
    gap: 10,
  },
  routeStepDistance: {
    fontSize: 14,
    color: '#666',
  },
  routeStepDuration: {
    fontSize: 14,
    color: '#666',
  },
});