import React, { useState } from "react";
import {
  StyleSheet,
  Keyboard,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { Image } from "react-native";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  async function handleSubmit() {
    const response = await fetch("http://18.231.104.28/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        cpf,
        password,
      }),
    });

    if (!response.ok) {
      setRegisterSuccess(false);
      setRegisterError(true);
      setVisible(true);
      Keyboard.dismiss();
    } else {
      const data = await response.json();
      setRegisterSuccess(true);
      setRegisterError(false);
      setVisible(true);
      Keyboard.dismiss();
      setTimeout(() => {
        navigation.navigate("Login");
      }, 600);
    }
  }
  return (
    <>
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView style={styles.view}>
          <Image
            source={require("../../assets/logo-azul.png")}
            style={styles.image}
          />
          <TextInput
            style={styles.input}
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            label="CPF"
            mode="outlined"
            value={cpf}
            onChangeText={setCpf}
          />
          <TextInput
            style={styles.input}
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
             right={
              <TextInput.Icon
                icon={hidePassword ? "eye" : "eye-off"}
                onPress={toggleHidePassword}
              />
            }
            secureTextEntry={hidePassword}
          />
          <Button 
           buttonColor="#407BFF"
            mode="contained" onPress={handleSubmit}>
            Cadastrar
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
     <View>
     {registerSuccess && (
       <Snackbar
         visible={visible}
         onDismiss={() => setVisible(false)}
         duration={2000}
         style={{ backgroundColor: "green" }}
       >
         Cadastro bem-sucedido!
       </Snackbar>
     )}

     {/* Se a mensagem de erro estiver visível, exibir Snackbar vermelho */}
     {registerError && (
       <Snackbar
         visible={visible}
         onDismiss={() => setVisible(false)}
         duration={2000}
         style={{ backgroundColor: "red" }}
       >
         Cadastro mal-sucedido. Verifique suas credenciais.
       </Snackbar>
     )}
   </View>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 35,
    paddingVertical: 50,
  },
  input: {
    marginBottom: 15,
  },
  image: {
    marginBottom:2,
  },
  view: {
    paddingHorizontal: 15,
  },
});
