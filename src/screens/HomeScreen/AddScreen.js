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

class AddScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            source={require("../../../assets/lebron.png")}
            style={styles.avatar}
          ></Image>
          <TextInput
            outerFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder="Type Here"
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.photo}>
          <Ionicons name="md-camera" size={32} color="black"></Ionicons>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  //
  static navigationOptions = {
    title: <Text>Supplies</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
  };
}

export default AddScreen;
