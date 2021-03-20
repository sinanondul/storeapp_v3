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
import DropShadow from "react-native-drop-shadow";

export default class AddScreen extends React.Component {
  state = {
    text: "",
    image: null,
    imageAllowed: false,
  };

  componentDidMount() {
    this.getPhotoPermission();
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
    this.handlePost();
    this.setState({ image: null });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.inputContainer}>
          <View>
            {getAvatar(this.props.userData)}
            <View>
              <TextInput
                outerFocus={true}
                multiline={true}
                numberOfLines={4}
                placeholder="Type Here"
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
                style={styles.textStyle}
              />
            </View>
          </View>
        </ScrollView>
        <View
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
          <View>
            <TouchableOpacity onPress={this.handlePost} style={styles.post}>
              <Icon
                name={
                  Platform.OS === "ios"
                    ? "ios-navigate-outline"
                    : "md-navigate-outline"
                }
                size={28}
                style={[
                  {
                    position: "absolute",
                    top: 5,
                    left: 5,
                  },
                  {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 3,
                      height: 3,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 10,
                  },
                  styles.post,
                ]}
                // onPress={() => this.setState({ image: null })}
                onPress={() => this.combinedFunctions()}
              />
            </TouchableOpacity>
          </View>
          <View>
            {this.state.image ? (
              <View>
                <Image
                  source={{ uri: this.state.image }}
                  style={{ width: "100%", height: "100%" }}
                />

                <Icon
                  name={
                    Platform.OS === "ios"
                      ? "ios-close-circle"
                      : "md-close-circle"
                  }
                  size={32}
                  style={[
                    {
                      position: "absolute",
                      top: 5,
                      right: 5,
                    },
                    {
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 3,
                        height: 3,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 3,
                      elevation: 10,
                    },
                    styles.camera,
                  ]}
                  onPress={() => this.setState({ image: null })}
                />
              </View>
            ) : (
              <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                <Ionicons name="md-camera" size={28} color="#FF6433"></Ionicons>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  //
  static navigationOptions = {
    title: <Text>Add Post</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
  };
}
