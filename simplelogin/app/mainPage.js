import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, Modal, Button, Pressable } from 'react-native';
import { getCharacters } from '../api/thronesApi';
import Icon from 'react-native-vector-icons/Ionicons'; // You can use any icon library, this example uses react-native-vector-icons
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook if using React Navigation
import { router } from 'expo-router';

export default function MainPage() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const navigation = useNavigation(); // Use the useNavigation hook

  useEffect(() => {
    async function fetchData() {
      const data = await getCharacters();
      setCharacters(data);
      setFilteredCharacters(data);
    }
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const filtered = characters.filter((char) =>
        char.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(characters);
    }
  };

  const handleCharacterPress = (character) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleCharacterPress(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.itemText}>{item.fullName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.settingsButton} onPress={() => router.push('profilePage')}>
        <Icon name="settings" size={24} color="white" />
      </Pressable>
      <Text style={styles.title} className='pt-7'>Game of Thrones Characters</Text>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Search Characters"
        placeholderTextColor="#888"
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCharacters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {selectedCharacter && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Image source={{ uri: selectedCharacter.imageUrl }} style={styles.modalImage} />
              <Text style={styles.modalText}>Name: {selectedCharacter.fullName}</Text>
              <Text style={styles.modalText}>Title: {selectedCharacter.title}</Text>
              <Text style={styles.modalText}>Family: {selectedCharacter.family}</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A', 
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'white',
    backgroundColor: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  itemText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 10, // Ensure the button is on top
  },
});
