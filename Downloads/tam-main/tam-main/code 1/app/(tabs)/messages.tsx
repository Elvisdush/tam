import React, { useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { mockMessages } from '@/mocks/messages';
import { useChatStore } from '@/store/chat-store';
import { useAuthStore } from '@/store/auth-store';

export default function MessagesScreen() {
  const messages = useChatStore(state => state.messages);
  const user = useAuthStore(state => state.user);
  const users = useAuthStore(state => state.users);
  
  const conversationList = useMemo(() => {
    if (!user) return [];
    
    const conversations = new Map();
    
    messages.forEach(message => {
      const otherUserId = message.senderId === user.id ? message.receiverId : message.senderId;
      const existingConv = conversations.get(otherUserId);
      
      if (!existingConv || new Date(message.timestamp) > new Date(existingConv.timestamp)) {
        const otherUser = users.find(u => u.id === otherUserId);
        if (otherUser) {
          conversations.set(otherUserId, {
            id: otherUserId,
            username: otherUser.username,
            avatar: otherUser.profileImage,
            lastMessage: message.type === 'text' ? message.content : 
                        message.type === 'voice' ? '🎵 Voice message' :
                        message.type === 'image' ? '📷 Photo' :
                        message.type === 'location' ? '📍 Location' : message.content,
            timestamp: message.timestamp,
            time: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }
      }
    });
    
    return Array.from(conversations.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [messages, user, users]);
  
  const handleMessagePress = (userId: string) => {
    router.push(`/chat/${userId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      
      <FlatList
        data={conversationList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.messageItem}
            onPress={() => handleMessagePress(item.id.toString())}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  messageItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 80,
  },
});