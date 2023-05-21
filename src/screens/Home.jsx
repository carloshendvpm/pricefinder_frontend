import React from 'react';
import { View, Text, Button } from 'react-native';


export function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate('Cadastro')} title='Clique aq'/>
    </View>
  );
}