import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '@/store/auth-store';

export default function RegisterDriverScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);
  const [currentImageType, setCurrentImageType] = useState<'profile' | 'vehicle'>('profile');
  
  const register = useAuthStore(state => state.register);

  const pickImage = async (type: 'profile' | 'vehicle') => {
    setCurrentImageType(type);
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      if (type === 'profile') {
        setProfileImage(result.assets[0].uri);
      } else {
        setVehicleImage(result.assets[0].uri);
      }
    }
  };

  const handleRegister = () => {
    if (username && email && phone && password && profileImage && vehicleImage) {
      register({
        username,
        email,
        phone,
        password,
        profileImage,
        vehicleImage,
        type: 'driver',
      });
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1682686580391-615b1f28e6d1?q=80&w=1470&auto=format&fit=crop' }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>
          
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.formContainer}>
              {!vehicleImage ? (
                <TouchableOpacity 
                  style={styles.photoContainer} 
                  onPress={() => pickImage('profile')}
                >
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                  ) : (
                    <View style={styles.addPhotoCircle}>
                      <Text style={styles.addPhotoText}>Add{'\n'}Photo of your{'\n'}face</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={styles.photoContainer} 
                  onPress={() => pickImage('vehicle')}
                >
                  <Image source={{ uri: vehicleImage }} style={styles.profileImage} />
                  <Text style={styles.photoLabel}>Add Photo of your Bike</Text>
                </TouchableOpacity>
              )}
              
              {profileImage && !vehicleImage && (
                <TouchableOpacity 
                  style={styles.photoContainer} 
                  onPress={() => pickImage('vehicle')}
                >
                  <View style={styles.addPhotoCircle}>
                    <Text style={styles.addPhotoText}>Add{'\n'}Photo of your{'\n'}Bike</Text>
                  </View>
                </TouchableOpacity>
              )}
              
              <TextInput
                style={styles.input}
                placeholder="User name"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              
              <TouchableOpacity 
                style={[
                  styles.registerButton,
                  (!username || !email || !phone || !password || !profileImage || !vehicleImage) && 
                  styles.disabledButton
                ]}
                onPress={handleRegister}
                disabled={!username || !email || !phone || !password || !profileImage || !vehicleImage}
              >
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  formContainer: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  photoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  addPhotoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addPhotoText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});