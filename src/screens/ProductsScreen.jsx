import React, { useState, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { ProductItem } from '../components/ProductItem';
import { useFocusEffect } from '@react-navigation/native';

export function ProductsScreen({ navigation }) {
  const route = useRoute();
  const { market_id } = route.params;
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetch(`http://18.231.104.28/market/${market_id}/products`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error(error);
      });
    }, [])
  );

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
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
          placeholder="Pesquisar produtos"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <Button onPress={handleSearch} mode='contained-tonal' style={styles.searchButton}>Pesquisar</Button>
      </View>
      <Button mode='contained-tonal' onPress={() => navigation.navigate('CadastraProduto', { market_id })} style={styles.button}>Adicionar novo produto</Button>
      {searchText.trim() !== '' && searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem key={item.id} product={item} />
          )}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem key={item.id} product={item} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
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
  searchButton: {
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
  },
});