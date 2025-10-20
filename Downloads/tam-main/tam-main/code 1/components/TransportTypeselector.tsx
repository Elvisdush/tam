import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

type TransportType = 'car' | 'motorbike';

interface TransportTypeSelectorProps {
  selected: TransportType;
  onSelect: (type: TransportType) => void;
}

export function TransportTypeSelector({ selected, onSelect }: TransportTypeSelectorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, selected === 'motorbike' && styles.selectedOption]}
        onPress={() => onSelect('motorbike')}
      >
        <View style={styles.backgroundContainer}>
          <Svg width="100%" height="100%" viewBox="0 0 100 100" style={styles.backgroundSvg}>
            {/* Motorbike Drawing */}
            <G fill="#4a5568" opacity="0.3">
              {/* Wheels */}
              <Circle cx="25" cy="70" r="12" stroke="#4a5568" strokeWidth="2" fill="none" />
              <Circle cx="75" cy="70" r="12" stroke="#4a5568" strokeWidth="2" fill="none" />
              {/* Frame */}
              <Path d="M25 70 L40 50 L60 50 L75 70" stroke="#4a5568" strokeWidth="3" fill="none" />
              <Path d="M40 50 L50 35 L65 35" stroke="#4a5568" strokeWidth="3" fill="none" />
              {/* Seat */}
              <Path d="M45 50 L60 50" stroke="#4a5568" strokeWidth="4" strokeLinecap="round" />
              {/* Handlebars */}
              <Path d="M50 35 L50 30" stroke="#4a5568" strokeWidth="2" />
              <Path d="M45 30 L55 30" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" />
              {/* Engine */}
              <Rect x="35" y="55" width="15" height="10" rx="2" fill="#4a5568" />
            </G>
          </Svg>
        </View>
        <View style={styles.optionContent}>
          <Text style={[styles.optionText, selected === 'motorbike' && styles.selectedText]}>
            Tax motor
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.option, selected === 'car' && styles.selectedOption]}
        onPress={() => onSelect('car')}
      >
        <View style={styles.backgroundContainer}>
          <Svg width="100%" height="100%" viewBox="0 0 100 100" style={styles.backgroundSvg}>
            {/* Car Drawing */}
            <G fill="#4a5568" opacity="0.3">
              {/* Wheels */}
              <Circle cx="25" cy="75" r="8" fill="#4a5568" />
              <Circle cx="75" cy="75" r="8" fill="#4a5568" />
              {/* Car Body */}
              <Path d="M15 75 L15 60 Q15 55 20 55 L35 55 L40 45 Q42 40 47 40 L53 40 Q58 40 60 45 L65 55 L80 55 Q85 55 85 60 L85 75" 
                    stroke="#4a5568" strokeWidth="2" fill="#4a5568" />
              {/* Windows */}
              <Path d="M42 55 L42 45 Q43 42 46 42 L54 42 Q57 42 58 45 L58 55" 
                    stroke="#4a5568" strokeWidth="1" fill="rgba(74, 85, 104, 0.5)" />
              {/* Doors */}
              <Path d="M20 60 L20 72" stroke="#4a5568" strokeWidth="1" />
              <Path d="M50 60 L50 72" stroke="#4a5568" strokeWidth="1" />
              <Path d="M80 60 L80 72" stroke="#4a5568" strokeWidth="1" />
              {/* Headlights */}
              <Circle cx="18" cy="65" r="2" fill="rgba(255, 255, 255, 0.8)" />
              <Circle cx="82" cy="65" r="2" fill="rgba(255, 255, 255, 0.8)" />
            </G>
          </Svg>
        </View>
        <View style={styles.optionContent}>
          <Text style={[styles.optionText, selected === 'car' && styles.selectedText]}>
            Tax car
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden',
    height: 80,
  },
  selectedOption: {
    borderColor: '#3498db',
    backgroundColor: '#f0f8ff',
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundSvg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  optionContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  selectedText: {
    color: '#3498db',
    fontWeight: '600',
  },
});