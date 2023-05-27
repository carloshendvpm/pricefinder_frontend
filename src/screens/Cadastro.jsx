import React, { useState } from 'react';
import { StyleSheet, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, Text } from 'react-native-paper';

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
        name,
        email,
        cpf,
        password
      }),
    });

    if (!response.ok) {
      alert('Error signing up.');
    } else {
      alert('Signed up successfully!');
      navigation.navigate('Login');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView>
          <Text>Se cadastre agora mesmo e comece a economizar</Text>
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
            keyboardType="email-address"
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            label="CPF"
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
          </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginVertical: 40
  },
  input: {
    marginBottom: 20,
  },
});