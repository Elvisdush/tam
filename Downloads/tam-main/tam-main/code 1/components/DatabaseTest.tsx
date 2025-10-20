import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { testDatabase, checkStorageContents } from '@/database/test';

export default function DatabaseTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runFullTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    addResult('🚀 Starting comprehensive database test...');

    try {
      await testDatabase();
      addResult('✅ All database operations completed successfully!');
    } catch (error) {
      addResult(`❌ Test failed: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const checkStorage = async () => {
    setIsRunning(true);
    setTestResults([]);
    addResult('📦 Checking current storage contents...');

    try {
      await checkStorageContents();
      addResult('✅ Storage check completed!');
    } catch (error) {
      addResult(`❌ Storage check failed: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearAllData = async () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all stored data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              const { database } = await import('@/database');
              await database.clearAllData();
              addResult('🧹 All data cleared successfully!');
            } catch (error) {
              addResult(`❌ Failed to clear data: ${error}`);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Database Test Suite</Text>
      <Text style={styles.subtitle}>Test your AsyncStorage database operations</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton, isRunning && styles.disabledButton]}
          onPress={runFullTest}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'Running Tests...' : 'Run Full Test Suite'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton, isRunning && styles.disabledButton]}
          onPress={checkStorage}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>Check Storage Contents</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.dangerButton]}
          onPress={clearAllData}
        >
          <Text style={styles.buttonText}>Clear All Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Test Results:</Text>
        <ScrollView style={styles.resultsScroll}>
          {testResults.map((result, index) => (
            <Text key={index} style={styles.resultText}>
              {result}
            </Text>
          ))}
          {testResults.length === 0 && (
            <Text style={styles.emptyText}>No tests run yet. Tap a button above to start.</Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>What this tests:</Text>
        <Text style={styles.infoText}>• User creation, retrieval, and updates</Text>
        <Text style={styles.infoText}>• Ride creation and management</Text>
        <Text style={styles.infoText}>• Message system functionality</Text>
        <Text style={styles.infoText}>• Location tracking</Text>
        <Text style={styles.infoText}>• Data persistence across app restarts</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  resultsScroll: {
    maxHeight: 200,
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 4,
    color: '#555',
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
});
