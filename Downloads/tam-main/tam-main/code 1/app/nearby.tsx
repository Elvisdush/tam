import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, X } from 'lucide-react-native';
import { router } from 'expo-router';


interface NearbyPassenger {
  id: string;
  name: string;
  profileImage: string;
  from: string;
  to: string;
  price: string;
  distance: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const mockNearbyPassengers: NearbyPassenger[] = [
  {
    id: '1',
    name: 'Chiss',
    profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop',
    from: 'Remera',
    to: 'Nyamirambo',
    price: '1500 RWF',
    distance: '0.6 km',
    location: { latitude: -1.9441, longitude: 30.0619 }
  },
  {
    id: '2',
    name: 'Jessica',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop',
    from: 'Kigali Heights',
    to: 'Allen St.',
    price: '2000 RWF',
    distance: '1.9 km',
    location: { latitude: -1.9506, longitude: 30.0588 }
  },
  {
    id: '3',
    name: 'Chris',
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop',
    from: 'Kimisagara',
    to: 'City Center',
    price: '1200 RWF',
    distance: '3.4 km',
    location: { latitude: -1.9578, longitude: 30.0611 }
  }
];

export default function NearbyScreen() {
  const [selectedPassenger, setSelectedPassenger] = useState<NearbyPassenger | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const handlePassengerPress = (passenger: NearbyPassenger) => {
    setSelectedPassenger(passenger);
    setShowModal(true);
  };
  
  const handleTakePassenger = () => {
    if (selectedPassenger) {
      setShowModal(false);
      // Pass passenger data as query params
      router.push({
        pathname: `/chat/${selectedPassenger.id}` as any,
        params: {
          name: selectedPassenger.name,
          profileImage: selectedPassenger.profileImage,
          from: selectedPassenger.from,
          to: selectedPassenger.to,
          price: selectedPassenger.price
        }
      });
    }
  };
  
  const renderPassengerItem = ({ item }: { item: NearbyPassenger }) => (
    <TouchableOpacity 
      style={styles.passengerItem}
      onPress={() => handlePassengerPress(item)}
    >
      <Image source={{ uri: item.profileImage }} style={styles.passengerAvatar} />
      <View style={styles.passengerInfo}>
        <Text style={styles.passengerName}>{item.name}</Text>
        <Text style={styles.passengerLocation}>Near {item.from}</Text>
      </View>
      <View style={styles.distanceContainer}>
        <Text style={styles.distance}>{item.distance}</Text>
        <View style={styles.arrow}>
          <Text style={styles.arrowText}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Near By Passengers</Text>
      </View>
      
      {/* Map View */}
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
          <View style={[styles.userLocation, { top: '55%', left: '50%' }]}>
            <View style={styles.userLocationDot} />
            <View style={styles.userLocationPulse} />
          </View>
        </View>
        
        {/* Passenger pins on map */}
        <TouchableOpacity 
          style={[styles.passengerPin, { top: '25%', left: '60%' }]}
          onPress={() => handlePassengerPress(mockNearbyPassengers[0])}
        >
          <Image source={{ uri: mockNearbyPassengers[0].profileImage }} style={styles.pinAvatar} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.passengerPin, { top: '45%', left: '20%' }]}
          onPress={() => handlePassengerPress(mockNearbyPassengers[1])}
        >
          <Image source={{ uri: mockNearbyPassengers[1].profileImage }} style={styles.pinAvatar} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.passengerPin, { top: '65%', left: '40%' }]}
          onPress={() => handlePassengerPress(mockNearbyPassengers[2])}
        >
          <Image source={{ uri: mockNearbyPassengers[2].profileImage }} style={styles.pinAvatar} />
        </TouchableOpacity>
        
        {/* Home button */}
        <TouchableOpacity style={styles.homeButton}>
          <View style={styles.homeIcon} />
        </TouchableOpacity>
      </View>
      
      {/* Passenger List */}
      <View style={styles.passengerList}>
        <FlatList
          data={mockNearbyPassengers}
          keyExtractor={(item) => item.id}
          renderItem={renderPassengerItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      {/* Passenger Details Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {selectedPassenger && (
              <>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setShowModal(false)}
                >
                  <X color="#666" size={24} />
                </TouchableOpacity>
                
                <Image 
                  source={{ uri: selectedPassenger.profileImage }} 
                  style={styles.modalAvatar} 
                />
                
                <Text style={styles.modalName}>{selectedPassenger.name}</Text>
                
                <View style={styles.tripDetails}>
                  <Text style={styles.tripLabel}>From: <Text style={styles.tripValue}>{selectedPassenger.from}</Text></Text>
                  <Text style={styles.tripLabel}>To: <Text style={styles.tripValue}>{selectedPassenger.to}</Text></Text>
                  <Text style={styles.tripLabel}>Paying: <Text style={styles.tripValue}>{selectedPassenger.price}</Text></Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.takePassengerButton}
                  onPress={handleTakePassenger}
                >
                  <Text style={styles.takePassengerText}>Taking passenger</Text>
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
  passengerPin: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  pinAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B19CD9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  homeIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
  },
  passengerList: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: 300,
  },
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  passengerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  passengerLocation: {
    fontSize: 14,
    color: '#666',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  arrow: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '85%',
    maxWidth: 350,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  modalName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  tripDetails: {
    alignSelf: 'stretch',
    marginBottom: 30,
  },
  tripLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  tripValue: {
    fontWeight: '600',
    color: '#333',
  },
  takePassengerButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  takePassengerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});