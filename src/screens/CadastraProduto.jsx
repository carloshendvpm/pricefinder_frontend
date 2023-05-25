import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';


export function CadastraProduto({ navigation }) {
  const route = useRoute();
  const { market_id } = route.params;
  return (
    <View>
      <Text>{market_id}</Text>
    </View>
  );
}