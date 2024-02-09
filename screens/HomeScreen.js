// HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const users = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  var agefiltereduser = [];
  if (searchAge) {
    agefiltereduser = users.filter((user) => user.age === searchAge);
  }

  return (
    <View
      style={{
        flex: "1",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        Welcome to the Home Screen!
      </Text>
      <TextInput
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          marginVertical: 10,
          width: "80%",
        }}
      />

      <Text>List of Registered Users:</Text>
      {searchQuery && (
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>Username: {item.username}</Text>
              <Text>Phone Number: {item.phoneNumber}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Location: {item.location}</Text>
              <Text>Age: {item.age}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {!searchQuery && (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>Username: {item.username}</Text>
              <Text>Phone Number: {item.phoneNumber}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Location: {item.location}</Text>
              <Text>Age: {item.age}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {/* Modal Section to search by age */}

      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Search by age</Text>
      </TouchableOpacity>
      <Text> </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Search by Age</Text>
            <TextInput
              placeholder="Search by age"
              value={searchAge}
              onChangeText={setSearchAge}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 8,
                marginVertical: 10,
                width: "80%",
                borderRadius: "1rem",
              }}
            />
            {searchAge && (
              <FlatList
                data={agefiltereduser}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text>Username: {item.username}</Text>
                    <Text>Phone Number: {item.phoneNumber}</Text>
                    <Text>Email: {item.email}</Text>
                    <Text>Location: {item.location}</Text>
                    <Text>Age: {item.age}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false), setSearchAge("");
              }}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const CustomHeader = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
      <Text style={styles.headerButtonText}>Logout</Text>
    </TouchableOpacity>
  );
};
const HomeScreenOptions = () => ({
  headerRight: () => <CustomHeader />,
});

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "gray",

    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  modalButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  headerButton: {
    marginRight: 10,
    paddingRight: 10,
  },
  headerButtonText: {
    color: "red",
    fontWeight: "bold",
  },
});

export { HomeScreen, HomeScreenOptions };
