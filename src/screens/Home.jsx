import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import MarketItem from '../components/MarketItem';


export function Home({ navigation }) {
  const [supermarkets, setSupermarkets] = useState([]);

  useEffect(() => {
    fetch('http://18.231.104.28/market')
      .then(response => response.json())
      .then(data => {
        setSupermarkets(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <View>
      <FlatList
        data={supermarkets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Products', { products: item.Products, market_id: item.id})}
          >
            <MarketItem name={item.name} products={item.Products} />
          </TouchableOpacity>
        )}
      />

    </View>
  );
}