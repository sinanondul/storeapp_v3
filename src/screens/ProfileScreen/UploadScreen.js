import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../../firebase/Fire";
import * as ImagePicker from "expo-image-picker";

export default class UploadScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Image Upload</Text>
      </SafeAreaView>
    );
  }

  //
  static navigationOptions = {
    title: <Text>Add Profile Picture</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleStyle: {
    flex: 0.6,
    paddingRight: 60,
    alignSelf: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 40,
    height: 48,
    borderRadius: 24,
    marginRight: 18,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
