import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useRideStore } from '@/store/ride-store';
import { useAuthStore } from '@/store/auth-store';
import { TransportTypeSelector } from '@/components/TransportTypeselector';

export default function PostRideScreen() {
  const user = useAuthStore(state => state.user);
  const addRide = useRideStore(state => state.addRide);
  const lastSearchParams = useRideStore(state => state.lastSearchParams);
  
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState('');
  const [transportType, setTransportType] = useState<'car' | 'motorbike'>('motorbike');
  
  useEffect(() => {
    if (lastSearchParams) {
      setFrom(lastSearchParams.from);
      setTo(lastSearchParams.to);
      setTransportType(lastSearchParams.transportType);
      if (lastSearchParams.price) {
        setPrice(lastSearchParams.price.toString());
      }
    }
  }, [lastSearchParams]);
  
  const handlePost = () => {
    if (from && to && (user?.type === 'passenger' || price)) {
      addRide({
        id: Date.now(),
        from,
        to,
        price: user?.type === 'driver' ? Number(price) : 0,
        transportType,
        driverId: user?.type === 'driver' ? user.id : null,
        passengerId: user?.type === 'passenger' ? user.id : null,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ChevronLeft color="#333" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {user?.type === 'driver' ? 'Post a Ride' : 'Request a Ride'}
            </Text>
          </View>
          
          <View style={styles.formContainer}>
            <TransportTypeSelector
              selected={transportType}
              onSelect={setTransportType}
            />
            
            <TextInput
              style={styles.input}
              placeholder="From"
              placeholderTextColor="#999"
              value={from}
              onChangeText={setFrom}
            />
            
            <TextInput
              style={styles.input}
              placeholder="To"
              placeholderTextColor="#999"
              value={to}
              onChangeText={setTo}
            />
            
            {user?.type === 'driver' && (
              <TextInput
                style={styles.input}
                placeholder="Price (RWF)"
                placeholderTextColor="#999"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            )}
            
            <TouchableOpacity 
              style={styles.postButton}
              onPress={handlePost}
            >
              <Text style={styles.postButtonText}>
                {user?.type === 'driver' ? 'Post Ride' : 'Request Ride'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  postButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});