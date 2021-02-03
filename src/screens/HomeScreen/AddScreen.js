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

const firebase = require("firebase");

export default class AddScreen extends React.Component {
  state = {
    text: "",
    image: null,
  };

  componentDidMount() {
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("C'mon give me permission man");
      }
    }
  };

  handlePost = () => {
    Fire.shared
      .addPost({
        text: this.state.text.trim(),
        localUri: this.state.image,
      })
      .then((ref) => {
        this.setState({ text: "", image: null });
        this.props.navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={this.handlePost}
          >
            <Text style={{ fontWeight: "400" }}>Post</Text>
          </TouchableOpacity>
        </View>
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
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.photo}>
          <Ionicons
            name="md-camera"
            size={32}
            color="black"
            onPress={this.pickImage}
          ></Ionicons>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </View>
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
