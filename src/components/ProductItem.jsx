import React from 'react';
import { View } from 'react-native';
import { Card, Avatar, IconButton } from 'react-native-paper'


export function ProductItem({ product }) {
  return (
    <View >
      <Card.Title
          key={product.id}
          title={product.name}
          titleStyle={{fontSize: 16, fontWeight: 'bold'}}
          subtitle={'R$ ' + 23.90}
          left={(props) => <Avatar.Icon {...props} icon="cart" />}
          right={(props) => <IconButton {...props} icon="chevron-right" />}
        />
    </View> 
  );
}
