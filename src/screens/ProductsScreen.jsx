import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { ProductItem } from '../components/ProductItem';


export function ProductsScreen({ navigation }) {
  const route = useRoute();
  const { products, market_id } = route.params;
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