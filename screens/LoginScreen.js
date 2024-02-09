// LoginScreen.js
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const users = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Please enter both username and password");
      return;
    }
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      Alert.alert("Login Successful");
      navigation.navigate("Home");
    } else {
      Alert.alert("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerc}>
        <Text
          style={{
            fontSize: "16px",
            alignSelf: "flex-end",
          }}
        >
          New here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  registerc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "7rem",
  },
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  registerText: {
    marginTop: 10,
    color: "blue",
    fontSize: 16,
  },
});

export default LoginScreen;
