import React, { useState, useEffect,useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MarketItem from '../components/MarketItem';

export function Home({ navigation }) {
  const [supermarkets, setSupermarkets] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(
    useCallback(() => {
    fetch('http://18.231.104.28/market')
      .then(response => response.json())
      .then(data => {
        setSupermarkets(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [])
  );
  const handleSearch = () => {
    if (searchText.trim() !== '') {
      const results = supermarkets.filter(supermarket =>
        supermarket.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIconContainer}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {searchText.trim() !== '' && searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Products', { products: item.Products, market_id: item.id })
              }
            >
              <MarketItem name={item.name} products={item.Products} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          data={supermarkets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Products', { products: item.Products, market_id: item.id })
              }
            >
              <MarketItem name={item.name} products={item.Products} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  searchIconContainer: {
    marginRight: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  }, 
});