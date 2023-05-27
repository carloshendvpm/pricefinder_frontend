import React, { useState, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput, Button, Snackbar, Text } from "react-native-paper";
import { Image, TouchableHighlight } from "react-native";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  async function handleSubmit() {
    const response = await fetch("http://18.231.104.28/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setLoginSuccess(false);
      setLoginError(true);
      setVisible(true);
      Keyboard.dismiss();
    } else {
      const data = await response.json();
      setLoginSuccess(true);
      setLoginError(false);
      setVisible(true);
      Keyboard.dismiss();
      setTimeout(() => {
        navigation.replace("Home");
      }, 600);
      //alert('Logged in successfully! Token: ' + data.token);
      // Salvar o token em algum lugar seguro (como SecureStore) aqui.
    }
  }

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Image
            source={require("../../assets/logo-azul.png")}
            style={styles.image}
          />
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={setEmail}
            activeOutlineColor="#407BFF"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            label="Password"
            value={password}
            onChangeText={setPassword}
            activeOutlineColor="#407BFF"
            mode="outlined"
            right={
              <TextInput.Icon
                icon={hidePassword ? "eye" : "eye-off"}
                onPress={toggleHidePassword}
              />
            }
            secureTextEntry={hidePassword}
          />
          <TouchableHighlight>
            <Button
              style={styles.button}
              onPress={() => navigation.navigate("Cadastro")}
            >
              <Text style={styles.subTxt}>
                Não possui conta? Cadastre-se
              </Text>
            </Button>
          </TouchableHighlight>
          <Button
            style={styles.button}
            buttonColor="#407BFF"
            mode="contained"
            onPress={handleSubmit}
          >
            Login
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View>
        {loginSuccess && (
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={2000}
            style={{ backgroundColor: "green" }}
          >
            Login bem-sucedido!
          </Snackbar>
        )}

        {/* Se a mensagem de erro estiver visível, exibir Snackbar vermelho */}
        {loginError && (
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={2000}
            style={{ backgroundColor: "red" }}
          >
            Login mal-sucedido. Verifique suas credenciais.
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
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  subTxt: {
    alignSelf: "center",
    color: "#407BFF",
  },
  image: {
    marginBottom: 20,
    marginTop:0
  },
});
