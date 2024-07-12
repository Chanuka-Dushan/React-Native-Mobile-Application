import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/authContext'; 
import { router } from 'expo-router';

export default function ProfilePage({ navigation }) {
  const { user, logout } = useAuth(); 

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() =>router.push('mainPage')}>
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <TextInput
          style={styles.emailInput}
          value={user.email} // Display the user's email
          editable={false}
          placeholder="Email"
          placeholderTextColor="#888"
        />
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 180,
  },
  emailInput: {
    height: 60,
    width: '100%',
    backgroundColor: '#3D3D3D',
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    marginTop: 30,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FFD482',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10, 
  },
});
