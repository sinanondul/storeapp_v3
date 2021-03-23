import React from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../../../firebase/Fire";
import * as ImagePicker from "expo-image-picker";

import { getAvatar } from "../../../functions/UserInfoFormatter";
import styles from "./styles";
//import DropShadow from "react-native-drop-shadow";

export default class AddScreen extends React.Component {
  state = {
    text: "",
    image: null,
    imageAllowed: false,
  };
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
    this.getPhotoPermission();
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Ionicons
            name={
              Platform.OS === "ios"
                ? "ios-navigate-outline"
                : "navigate-outline"
            }
            style={styles.post}
            size={28}
            onPress={() => this.combinedFunctions()}
          />
        </TouchableOpacity>
      ),
    });
  }

  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status == "granted") {
        this.setState({ imageAllowed: true });
      }
    }
  };

  handlePost = () => {
    Fire.shared
      .addPost({
        text: this.state.text.trim(),
        localUri: this.state.image,
      })
      .catch((error) => {
        alert(error);
      });
    this.props.navigation.goBack();
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  combinedFunctions = () => {
    this.setState({ image: null });
    this.handlePost();
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inputContainer}>
          <View style={{ flexDirection: "row" }}>
            {getAvatar(this.props.userData, 40)}
            <View>
              <View style={styles.wholePost}>
                <TextInput
                  autoFocus={true}
                  outerFocus={true}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Type Here"
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.text}
                  style={styles.textStyle}
                />
                {this.state.image ? (
                  <View style={styles.postPhoto}>
                    <Image
                      source={{ uri: this.state.image }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />

                    <Icon
                      name={
                        Platform.OS === "ios"
                          ? "ios-close-circle"
                          : "md-close-circle"
                      }
                      size={32}
                      style={styles.close}
                      onPress={() => this.setState({ image: null })}
                    />
                  </View>
                ) : null}
              </View>
              {this.state.image ? null : (
                <View style={styles.bottom}>
                  <TouchableOpacity
                    style={styles.photo}
                    onPress={this.pickImage}
                  >
                    <Ionicons
                      name="md-camera"
                      size={28}
                      color="#FF6433"
                    ></Ionicons>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View></View>
        </View>
      </KeyboardAvoidingView>
      /* <View
          style={[
            styles.bottom,
            {
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 13,
            },
          ]}
        >

        </View> */
    );
  }

  //
  static navigationOptions = {
    title: <Text>Add Post</Text>,
    //headerBackTitle: "Cancel",
    headerStyle: {
      backgroundColor: "#FFFFFF",
    },
    // headerTintColor: "#fff",
  };
}
