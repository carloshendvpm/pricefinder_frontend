import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { ProductItem } from '../components/ProductItem';
import { useFocusEffect } from '@react-navigation/native';

export function ProductsScreen({ navigation }) {
  const route = useRoute();
  const { market_id } = route.params;
  const [products, setProducts] = useState([]);

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

  return (
    <View style={styles.container}>
      <Button mode='contained-tonal' onPress={() => navigation.navigate('CadastraProduto', { market_id })} styles={styles.button}>Adicionar novo produto</Button>
      {products.length > 0 
        ? products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        : <Text>Ops... Parece que você não tem produtos cadastrados</Text>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical:10
  },
});