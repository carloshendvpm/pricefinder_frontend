import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';


export function CadastraProduto({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [ean, setEan] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [scannerActive, setScannerActive] = useState(true);
  const [eanEditable, setEanEditable] = useState(false);
  const [editEan, setEditEan] = useState(false);
  
  const onProductSubmit = () => {
    alert('tudo certo')
  };


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
      <TextInput style={styles.input} label='Name' value={name} onChangeText={setName} />
      <TextInput style={styles.input} label='Description' value={description} onChangeText={setDescription} />
      <TextInput 
        label='EAN' 
        value={ean} 
        onChangeText={setEan} 
        keyboardType='numeric' 
        editable={eanEditable}
        onTouchStart={handleEanPress} // Alert when user tries to edit EAN
      />

      {scannerActive && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {scanned && <Button mode='contained' style={styles.button} onPress={() => setScanned(false)}>Tap to Scan Again</Button>}

      <Button style={styles.button} mode='contained' onPress={onProductSubmit}>Submit</Button>
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