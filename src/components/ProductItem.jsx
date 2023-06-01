import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Avatar, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

export function ProductItem({ product }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product })}>
      <View>
        <Card.Title
            key={product.id}
            title={product.name}
            titleStyle={{fontSize: 16, fontWeight: 'bold'}}
            subtitle={'R$' + product.price}
            left={(props) => <Avatar.Icon {...props} icon="cart" />}
            right={(props) => <IconButton {...props} icon="chevron-right" />}
          />
      </View> 
    </TouchableOpacity>
  );
}
