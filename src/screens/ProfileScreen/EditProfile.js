import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import * as Permissions from "expo-permissions";

import { useTheme } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import firebase from "firebase";
//import firestore from "@react-native-firebase/firestore";

import { getFullName, getAvatar } from "../../functions/UserInfoFormatter";

const bs = React.createRef();

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "https://api.adorable.io/avatars/80/abott@adorable.png",
      fall: new Animated.Value(1),
      user: {
        uid: "",
        name: "",
        handle: "",
        about: "",
        surename: "",
        fullName: "",
        email: "",
        location: "",
        phone: "",
        userImg: "",
      },
      uploading: [],
      transferred: [],
    };
  }

  getPermission = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  componentDidMount() {
    this.getPermission();
    this.getUser();
  }

  getUser = async () => {
    const currentUser = await firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data());
          this.setState({ user: documentSnapshot.data() });
        }
      });
  };

  handleUpdate = async () => {
    let imgUrl = await this.uploadPhoto();

    if (imgUrl == null && this.state.user.userImg) {
      imgUrl = this.state.user.userImg;
    }
    firebase
      .firestore()
      .collection("users")
      .doc(this.state.user.uid)
      .update({
        name: this.state.user.name,
        surename: this.state.user.surename,
        about: this.state.user.about,
        handle: this.state.user.handle,
        email: this.state.user.email,
        location: this.state.user.location,
        phone: this.state.user.phone,
        location: this.state.user.location,
        userImg: this.props.imgUrl,
      })
      .then(() => {
        console.log("User Updated!");
        Alert.alert(
          "Profile Updated!",
          "Your Profile has been updated succesfully."
        );
      });
  };

  uploadPhoto = async (uri) => {
    const path = `profilePhotos/${this.uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      {/* <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.panelButton}
        onPress={this.choosePhotoFromLibrary}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={bs}
          snapPoints={[270, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.state.fall}
          enabledGestureInteraction={true}
          enabledContentTapInteraction={false}
        />
        <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(this.state.fall, 1.0)),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={{
                    uri: this.state.image,
                  }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#ffffff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {this.state.user ? this.state.user.name : ""}{" "}
              {this.state.user ? this.state.user.surename : ""}
            </Text>
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={this.props.textColor} size={20} />
            <TextInput
              placeholder={this.state.user.name}
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={this.state.user ? this.state.user.name : ""}
              onChangeText={(txt) =>
                this.setState({ ...this.state.user, name: txt })
              }
              style={[
                styles.textInput,
                {
                  color: this.props.textColor,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={this.props.textColor} size={20} />
            <TextInput
              placeholder={this.state.user.surename}
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={this.state.user ? this.state.user.surename : ""}
              onChangeText={(txt) =>
                this.setState({ ...this.state.user, surename: txt })
              }
              style={[
                styles.textInput,
                {
                  color: this.props.textColor,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <Feather name="phone" color={this.props.textColor} size={20} />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              value={this.state.user ? this.state.user.phone : ""}
              onChangeText={(txt) =>
                this.setState({ ...this.state.user, phone: txt })
              }
              style={[
                styles.textInput,
                {
                  color: this.props.textColor,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome
              name="envelope-o"
              color={this.props.textColor}
              size={20}
            />
            <TextInput
              placeholder={this.state.user.email}
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCorrect={false}
              value={this.state.user ? this.state.user.email : ""}
              onChangeText={(txt) =>
                this.setState({ ...this.state.user, email: txt })
              }
              style={[
                styles.textInput,
                {
                  color: this.props.textColor,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="globe" color={this.props.textColor} size={20} />
            <TextInput
              placeholder="Location"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={this.state.user ? this.state.user.location : ""}
              onChangeText={(txt) =>
                this.setState({ ...this.state.user, location: txt })
              }
              style={[
                styles.textInput,
                {
                  color: this.props.textColor,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            style={styles.commandButton}
            onPress={() => {
              this.handleUpdate;
            }}
          >
            <Text style={styles.panelButtonTitle}>Update</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});