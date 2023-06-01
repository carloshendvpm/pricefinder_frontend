import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Keyboard} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';

export function CadastraProduto({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [ean, setEan] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [scannerActive, setScannerActive] = useState(true);
  const [eanEditable, setEanEditable] = useState(false);
  const [editEan, setEditEan] = useState(false);
  
  async function onProductSubmit() {
    const response = await fetch('http://18.231.104.28/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        ean,
        market_id,
        price,
      }),
    });

    if (!response.ok) {
      alert('Erro ao cadastrar produto .');
    } else {
      alert('Produto cadastrado com sucesso!');
      navigation.goBack();
    }
  }

  const route = useRoute();
  const { market_id } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setEan(data);
    setScannerActive(false);
  };

  const handleEanPress = () => {
    if (editEan) return;

    Alert.alert(
      "Editar EAN",
      "Você tem certeza que quer editar o EAN?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "Sim", onPress: () => { setEanEditable(true); setEditEan(true); } }
      ],
      { cancelable: false }
    );
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        mode='outlined' 
        label='Nome do Produto' 
        value={name} 
        onChangeText={setName}
        activeOutlineColor="#407BFF" 
      />
      <TextInput 
        style={styles.input} 
        mode='outlined' 
        label='Descrição' 
        value={description} 
        onChangeText={setDescription}
        activeOutlineColor="#407BFF" 
      />
      <TextInput 
        style={styles.input} 
        mode='outlined' 
        label='Preço R$' 
        value={price} 
        onChangeText={(text) => setPrice(parseFloat(text))}
        activeOutlineColor="#407BFF" 
      />
      <TextInput 
        mode='outlined'
        label='EAN' 
        value={ean} 
        onChangeText={setEan} 
        keyboardType='numeric' 
        editable={eanEditable}
        onTouchStart={handleEanPress}
        activeOutlineColor="#407BFF"
      />

      {scannerActive && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {scanned && <Button mode='contained' style={styles.button} onPress={() => setScanned(false)}>Toque para scanear novamente</Button>}

      <Button style={styles.button} mode='contained' onPress={onProductSubmit}>Cadastrar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 30,
  },
  button: {
    marginVertical:12,
  }
});