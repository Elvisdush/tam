import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'voice' | 'location';
  duration?: number;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

interface ChatState {
  messages: ChatMessage[];
  sendMessage: (message: ChatMessage) => void;
  deleteMessage: (messageId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [
        {
          id: '1',
          senderId: '1',
          receiverId: '3',
          content: 'Kimihurura to Nyamirambo 1000Rwf',
          timestamp: '2025-06-29T10:30:00Z',
          type: 'text'
        },
        {
          id: '2',
          senderId: '3',
          receiverId: '1',
          content: '900Rwf',
          timestamp: '2025-06-29T10:31:00Z',
          type: 'text'
        },
        {
          id: '3',
          senderId: '1',
          receiverId: '3',
          content: 'Can you pls make it 1000Rwf',
          timestamp: '2025-06-29T10:32:00Z',
          type: 'text'
        },
        {
          id: '4',
          senderId: '1',
          receiverId: '3',
          content: 'I am even in bus stop here kigali height right now',
          timestamp: '2025-06-29T10:33:00Z',
          type: 'text'
        },
        {
          id: '5',
          senderId: '3',
          receiverId: '1',
          content: 'me to I am in that bus stop',
          timestamp: '2025-06-29T10:34:00Z',
          type: 'text'
        },
        {
          id: '6',
          senderId: '1',
          receiverId: '3',
          content: 'voice_message_sample',
          timestamp: '2025-06-29T10:35:00Z',
          type: 'voice',
          duration: 12
        },
        {
          id: '7',
          senderId: '3',
          receiverId: '1',
          content: 'voice_message_reply',
          timestamp: '2025-06-29T10:36:00Z',
          type: 'voice',
          duration: 8
        },
        {
          id: '8',
          senderId: '1',
          receiverId: '3',
          content: 'taxiapp://location?id=location_1735902000000&lat=-1.9441&lng=30.0619&sender=1&receiver=3',
          timestamp: '2025-06-29T10:37:00Z',
          type: 'location',
          location: {
            latitude: -1.9441,
            longitude: 30.0619,
            address: 'Kigali Heights, Kigali'
          }
        },
      ],
      
      sendMessage: (message) => {
        set(state => ({
          messages: [...state.messages, message],
        }));
      },
      
      deleteMessage: (messageId) => {
        set(state => ({
          messages: state.messages.filter(message => message.id !== messageId),
        }));
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);