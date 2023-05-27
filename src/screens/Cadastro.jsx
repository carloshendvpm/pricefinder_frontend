import React, { useState } from 'react';
import { StyleSheet, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };


  async function handleSubmit() {
    const response = await fetch('http://18.231.104.28/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        cpf
      }),
    });

    if (!response.ok) {
      alert('Error signing up.');
    } else {
      alert('Signed up successfully!');
      navigation.navigate('Login');
      // Navegue para a próxima tela aqui.
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Image
              source={require('../../assets/signup.png')}
              style={{ width: 200, height: 200, alignSelf: 'center', marginBottom:20 }}
          />
          <TextInput
            style={styles.input}
            label="Name"
            mode='outlined'
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            label="Email"
            mode='outlined'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            label="cpf"
            mode='outlined'
            value={cpf}
            onChangeText={setCpf}
          />
          <TextInput
            style={styles.input}
            label="Password"
            mode='outlined'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button mode='contained-tonal' onPress={handleSubmit}>Cadastrar</Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
});