import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper'

const SupermarketItem = ({ name, products }) => {
  return (
    <View style={styles.wrapper}>
      <Card.Title
        title={name}
        subtitle={products.length + ' produtos cadastrados'}
        left={(props) => <IconButton {...props} icon="store" />}
        right={(props) => <IconButton {...props} icon="chevron-right" />}
        style={styles.container}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 7,
    elevation: 3, // box-shadow for Android
    shadowColor: '#000', // box-shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default SupermarketItem;