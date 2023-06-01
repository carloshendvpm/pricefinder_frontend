import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { TextInput, Text, Button} from 'react-native-paper';
import { ChartProduct } from '../components/ChartProduct';

export function ProductDetails({ route, navigation }) {
  const [product, setProduct] = useState(route.params.product);
  const [isEditing, setIsEditing] = useState(false);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const deleteProductAPI = async (id) => {
    try {
      const response = await fetch(`http://18.231.104.28/product/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Ocorreu um erro ao deletar o produto');
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Produto",
      "Você realmente quer excluir este produto?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            try {
              await deleteProductAPI(product.id);
              navigation.goBack();
            } catch (error) {
              console.error('Erro ao deletar produto:', error);
            }
          }
        }
      ]
    );
  };
  

  const updateProductAPI = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://18.231.104.28/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Ocorreu um erro ao atualizar o produto');
      }
  
      return data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  };

  const saveChanges = async () => {
    try {
      const updatedProduct = await updateProductAPI(product.id, product);
      setProduct(updatedProduct);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (

    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{product.name}</Text>
          {isEditing ? (
            <>
              <TextInput
                label={'Nome do produto'}
                style={styles.input}
                value={product.name}
                onChangeText={text => setProduct({ ...product, name: text })}
              />
              <TextInput
                label={'Descrição do produto'}
                style={styles.input}
                value={product.description}
                onChangeText={text => setProduct({ ...product, description: text })}
              />
              <Button mode='contained-tonal' onPress={saveChanges}> Salvar </Button>
            </>
          ) : (
            <Button mode="contained-tonal" onPress={startEditing}>Editar</Button>
            )}
            <Button mode="contained-tonal" onPress={handleDelete}>Apagar produto</Button>
          <ChartProduct product={product} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:10
  },
  input: {
    marginBottom: 15,
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center'
  }
});
