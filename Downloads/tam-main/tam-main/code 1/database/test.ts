import { database } from './index';

// Test function to verify database operations
export const testDatabase = async () => {
  console.log('🧪 Starting Database Tests...');

  try {
    // Test 1: Create a user
    console.log('📝 Test 1: Creating user...');
    const testUser = await database.createUser({
      username: 'testuser',
      email: 'test@example.com',
      phone: '+1234567890',
      password: 'password123',
      profileImage: 'https://example.com/avatar.jpg',
      type: 'passenger'
    });
    console.log('✅ User created:', testUser);

    // Test 2: Get user by email
    console.log('🔍 Test 2: Getting user by email...');
    const foundUser = await database.getUserByEmail('test@example.com');
    console.log('✅ User found:', foundUser);

    // Test 3: Create a ride
    console.log('🚗 Test 3: Creating ride...');
    const testRide = await database.createRide({
      from: 'New York',
      to: 'Boston',
      price: 50,
      transportType: 'car',
      driverId: null,
      passengerId: testUser.id,
      status: 'pending'
    });
    console.log('✅ Ride created:', testRide);

    // Test 4: Get rides by user
    console.log('📋 Test 4: Getting rides by user...');
    const userRides = await database.getRidesByUser(testUser.id);
    console.log('✅ User rides:', userRides);

    // Test 5: Update ride
    console.log('🔄 Test 5: Updating ride...');
    const updatedRide = await database.updateRide(testRide.id.toString(), {
      status: 'accepted',
      driverId: 'driver123'
    });
    console.log('✅ Ride updated:', updatedRide);

    // Test 6: Create a message
    console.log('💬 Test 6: Creating message...');
    const testMessage = await database.createMessage({
      rideId: testRide.id.toString(),
      senderId: testUser.id,
      receiverId: 'driver123',
      content: 'Hello, I need a ride!'
    });
    console.log('✅ Message created:', testMessage);

    // Test 7: Get messages by ride
    console.log('📨 Test 7: Getting messages by ride...');
    const rideMessages = await database.getMessagesByRide(testRide.id.toString());
    console.log('✅ Ride messages:', rideMessages);

    // Test 8: Update location
    console.log('📍 Test 8: Updating location...');
    const testLocation = await database.updateLocation({
      userId: testUser.id,
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 10
    });
    console.log('✅ Location updated:', testLocation);

    // Test 9: Get user location
    console.log('🗺️ Test 9: Getting user location...');
    const userLocation = await database.getUserLocation(testUser.id);
    console.log('✅ User location:', userLocation);

    console.log('🎉 All database tests passed!');

    // Optional: Clean up test data
    console.log('🧹 Cleaning up test data...');
    await database.deleteRide(testRide.id.toString());
    await database.deleteUser(testUser.id);
    console.log('✅ Test data cleaned up');

  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
};

// Function to check AsyncStorage contents
export const checkStorageContents = async () => {
  console.log('📦 Checking AsyncStorage contents...');

  try {
    const users = await database.getAllUsers();
    const rides = await database.getAllRides();

    console.log('👥 Users in storage:', users.length);
    console.log('🚗 Rides in storage:', rides.length);

    if (users.length > 0) {
      console.log('Sample user:', users[0]);
    }
    if (rides.length > 0) {
      console.log('Sample ride:', rides[0]);
    }

  } catch (error) {
    console.error('❌ Error checking storage:', error);
  }
};
