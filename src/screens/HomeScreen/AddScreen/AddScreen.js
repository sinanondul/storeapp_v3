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
  Alert,
} from "react-native";
import { HeaderBackButton, Header } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../../../firebase/Fire";
import * as ImagePicker from "expo-image-picker";

import XButton from "../../../components/XButton";
import { getAvatar } from "../../../functions/UserInfoFormatter";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
      headerLeft: () => (
        <HeaderBackButton
          headerTintColor="white"
          tintColor={"#fff"}
          onPress={() => {
            Keyboard.dismiss();
            setTimeout(() => {
              this.props.navigation.goBack();
            }, 160);
          }}
        />
      ),
      headerRight: () => (
        //this.state.text !== "" || this.state.image ? (
        <TouchableOpacity style={styles.postButton} onPress={this.handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      ),
      // ) : null,
    });
  }

  onChangeText = (text) => {
    const maxLines = 10;
    const lines = text.split("\n");

    if (lines.length <= (maxLines || 1)) {
      this.setState({ text });
    }
  };

  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status == "granted") {
        this.setState({ imageAllowed: true });
      }
    }
  };

  handlePost = () => {
    if (this.state.text !== "" || this.state.image) {
      Fire.shared
        .addPost({
          userData: this.props.userData,
          text: this.state.text.trim(),
          localUri: this.state.image,
        })
        .catch((error) => {
          alert(error);
        });
      this.props.navigation.goBack();
    } else {
      Alert.alert("Cannot Post Blank");
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={65}
        style={styles.container}
      >
        <KeyboardAwareScrollView>
          <View style={styles.inputContainer}>
            {getAvatar(this.props.userData, 50)}

            <View style={{ flexDirection: "column" }}>
              <View style={styles.talkBubble}>
                <View style={styles.talkBubbleTriangle} />

                <View style={styles.talkBubbleSquare}>
                  <View style={styles.textWrapper}>
                    <TextInput
                      autoFocus={true}
                      outerFocus={true}
                      multiline={true}
                      maxLength={280}
                      placeholder="Type your post here..."
                      onChangeText={this.onChangeText}
                      value={this.state.text}
                      style={styles.textStyle}
                    />
                  </View>
                  {this.state.image ? (
                    <View style={styles.postPhoto}>
                      <Image
                        source={{ uri: this.state.image }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                      <XButton onPress={() => this.setState({ image: null })} />
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={this.pickImage}
          >
            <Ionicons name="camera" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButton}
            //onPress={this.pickImage} /* TODO add files etc.
          >
            <Ionicons name="add-circle-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  //
  static navigationOptions = {
    title: <Text>Add Post</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
    // headerTintColor: "#fff",
  };
}
