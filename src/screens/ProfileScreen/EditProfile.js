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
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";

import { useTheme } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import getFullName from "../../functions/UserInfoFormatter";
//import firestore from "@react-native-firebase/firestore";

import { getFullName, getAvatar } from "../../functions/UserInfoFormatter";
import { ScrollView } from "react-native-gesture-handler";

const bs = React.createRef();

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      fall: new Animated.Value(1),
      user: {
        id: null,
        name: null,
        handle: null,
        department: null,
        about: null,
        surename: null,
        fullName: null,
        email: null,
        location: null,
        phone: null,
        avatar: null,
      },
      uploading: [],
      transferred: [],
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

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
    this.setState({
      image: null,
      user: {
        id: this.props.userData.uid,
        name: this.props.userData.name,
        handle: this.props.userData.handle,
        about: this.props.userData.about,
        surename: this.props.userData.surename,
        fullName: this.props.userData.fullName,
        email: this.props.userData.email,
        department: this.props.userData.department,
        avatar: this.props.userData.avatar,
        location: this.props.userData.location,
        phone: this.props.userData.phone,
      },
    });
    this.getPermission();
  }

  getUser = async () => {
    const currentUser = await firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          //console.log("User Data", documentSnapshot.data());
          this.setState({ user: documentSnapshot.data() });
        }
      });
  };

  handleUpdate = async () => {
    let imgUrl = null;
    if (this.state.image) {
      imgUrl = await this.uploadPhoto(this.state.image);
    } else {
      imgUrl = this.props.userData.avatar;
    }

    firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid)
      .set(
        {
          id: this.state.user.id,
          name: this.state.user.name,
          surename: this.state.user.surename,
          fullName: this.state.user.fullName,
          email: this.state.user.email,
          handle: this.state.user.handle,
          about: this.state.user.about,
          department: this.state.user.department,
          location: this.state.user.location,
          phone: this.state.user.phone,
          avatar: imgUrl,
        },
        { merge: true }
      )
      .then(() => {
        console.log("User Updated!");
        Alert.alert(
          "Profile Updated!",
          "Your Profile has been updated succesfully."
        );
        this.props.navigation.goBack();
      }).catch(error => Alert.alert(error.toString()));
  };

  uploadPhoto = async (uri) => {
    const path = `profilePhotos/${this.props.userData.uid}/${Date.now()}.jpg`;

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
      quality: 1,
    });

    const manipResult = await ImageManipulator.manipulateAsync(
      result.localUri || result.uri,
      [{ resize: { width: 140, height: 140 } }],
      { format: ImageManipulator.SaveFormat.PNG }
    );
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: manipResult.uri });
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
    let displayImage = this.props.userData.avatar;
    if (this.state.image) {
      displayImage = this.state.image;
    }

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
        <KeyboardAwareScrollView>
            <Animated.View
              style={{
                margin: 20,
                opacity: Animated.add(
                  0.1,
                  Animated.multiply(this.state.fall, 1.0)
                ),
              }}
            >
              <View
                style={{ paddingBottom: 30, alignItems: "center" }}
                // onPress={Keyboard.dismiss} /**/
              >
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
                        uri: displayImage,
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
                          size={25}
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
                <Text
                  style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}
                >
                  {this.props.userData.fullName}
                  {/* {this.state.user ? this.state.user.name : ""}{" "}
                  {this.state.user ? this.state.user.surename : ""} */}
                </Text>
              </View>
              <View style={styles.inputView}>
                <View style={styles.action}>
                  <View style={styles.rowBox}>
                    <Text style={styles.textbox}>Username </Text>
                  </View>

                  <View style={styles.textWrapper}>
                    {/* <FontAwesome
                      name="at"
                      color={this.props.textColor}
                      size={10}
                      paddingTop={20}
                    /> */}
                    <TextInput
                      placeholder={"@" + this.state.user.handle}
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      value={this.state.user.handle}
                      onChangeText={(txt) => {
                        if (txt[0] !== "@") {
                          txt = "@" + txt;
                        }
                        this.setState({
                          user: { ...this.state.user, handle: txt },
                        })
                      }
                      }
                      style={styles.textInput}
                    />
                  </View>
                </View>
                {/* <View style={styles.action}>
                <View style={{ marginRight: 5, paddingTop: 1 }}>
                  <FontAwesome
                    name="user-o"
                    color={this.props.textColor}
                    size={20}
                  />
                </View>
                <View
                  onPress={Keyboard.dismiss}
                  style={{ flex: 1, width: 200 }}
                >
                  <View style={{ justifyContent: "space-around" }}>
                    <TextInput
                      placeholder={this.state.user.name}
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      value={this.state.user.name}
                      onChangeText={(txt) =>
                        this.setState({
                          user: { ...this.state.user, name: txt },
                        })
                      }
                      style={[
                        styles.textInput,
                        {
                          color: this.props.textColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View> */}
                {/* <View style={styles.action}>
                <View style={{ paddingTop: 1, width: 20 }}>
                  <FontAwesome
                    name="user-o"
                    color={this.props.textColor}
                    size={20}
                  />
                </View>

                <View
                  onPress={Keyboard.dismiss}
                  style={{ flex: 1, width: 200 }}
                >
                  <View style={{ justifyContent: "space-around" }}>
                    <TextInput
                      placeholder={this.state.user.surename}
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      value={this.state.user.surename}
                      onChangeText={(txt) =>
                        this.setState({
                          user: { ...this.state.user, surename: txt },
                        })
                      }
                      style={[
                        styles.textInput,
                        {
                          color: this.props.textColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View> */}
                {/* <View style={styles.action}>
                <View style={{ paddingTop: 1, width: 20 }}>
                  <FontAwesome
                    name="phone"
                    color={this.props.textColor}
                    size={20}
                  />
                </View>

                <View
                  onPress={Keyboard.dismiss}
                  style={{ flex: 1, width: 200 }}
                >
                  <View style={{ justifyContent: "space-around" }}>
                    <TextInput
                      placeholder={this.state.user.phone}
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      keyboardType="number-pad"
                      value={this.state.user.phone}
                      onChangeText={(txt) =>
                        this.setState({
                          user: { ...this.state.user, phone: txt },
                        })
                      }
                      style={[
                        styles.textInput,
                        {
                          color: this.props.textColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View> */}
                <View style={styles.action}>
                  <View style={styles.rowBox}>
                    <Text style={styles.textbox}>Location </Text>
                  </View>
                  {/* <FontAwesome
                    name="map"
                    color={this.props.textColor}
                    size={20}
                  /> */}

                  <View style={styles.textWrapper}>
                    <TextInput
                      placeholder={this.state.user.location}
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      value={this.state.user.location}
                      onChangeText={(txt) =>
                        this.setState({
                          user: { ...this.state.user, location: txt },
                        })
                      }
                      style={styles.textInput}
                    />
                  </View>
                </View>
                <View style={styles.largeaction}>
                  <View style={styles.rowBox}>
                    <Text style={styles.textbox}>Bio </Text>
                  </View>
                  {/* <FontAwesome
                  name="comment"
                  color={this.props.textColor}
                  size={20}
                /> */}

                  <View style={styles.textAreaContainer}>
                    <TextInput
                      outerFocus={true}
                      multiline={true}
                      numberOfLines={4}
                      ellipsizeMode="tail"
                      maxLength={140}
                      placeholder={this.state.user.about}
                      style={styles.textArea}
                      autoCorrect={false}
                      placeholderTextColor="#666666"
                      value={this.state.user.about}
                      onChangeText={(txt) =>
                        this.setState({
                          user: { ...this.state.user, about: txt },
                        })
                      }
                    />
                  </View>
                </View>
                <View style={styles.action}>
                  <View style={styles.rowBox}>
                    <Text style={styles.textbox}>Department </Text>
                  </View>
                  {/* <FontAwesome
                  name="university"
                  color={this.props.textColor}
                  size={20}
                /> */}

                  <View style={styles.textWrapper}>
                    <TextInput
                      // placeholder= {{ this.state.user.department ? ({this.state.user.department})  : ("department" )}};

                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      value={this.state.user.department}
                      onChangeText={(txt) =>
                        this.setState({
                          user: { ...this.state.user, department: txt },
                        })
                      }
                      style={styles.textInput}
                    />
                  </View>
                </View>
                {/* <View style={styles.action}>
                <FontAwesome
                  name="envelope"
                  color={this.props.textColor}
                  size={20}
                />
                <View
                  onPress={Keyboard.dismiss}
                  style={{ flex: 1, width: 200 }}
                >
                  <View style={{ justifyContent: "space-around" }}>
                    <TextInput
                      placeholder={this.state.user.email}
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      value={this.state.user.email}
                      onChangeText={(txt) =>
                        this.setState({
                          user: { ...this.state.user, email: txt },
                        })
                      }
                      style={[
                        styles.textInput,
                        {
                          color: this.props.textColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View> */}
              </View>

              <TouchableOpacity
                style={styles.commandButton}
                onPress={() => {
                  this.handleUpdate();
                }}
              >
                <Text style={styles.panelButtonTitle}>Update</Text>
              </TouchableOpacity>
            </Animated.View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
  static navigationOptions = {
    title: "Edit Profile",
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: Platform.OS === "ios" ? 0 : 60,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fbff",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgb(255, 92, 43)",
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
    shadowColor: "#000000",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
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
  inputView: {
    flex: 1,
    //borderWidth: 2,
    //padding: 6,
  },
  rowBox: {
    width: 90,
    height: 50,
    //borderWidth: 2,

    //justifyContent: "center",
    //alignItems: "center",
  },
  action: {
    flexDirection: "row",
    //marginTop: 10,
    //marginBottom: 10,
    //borderTopWidth: 2,
    borderTopColor: "#f2f2f2",
    borderBottomWidth: 2,
    borderBottomColor: "#f2f2f2",
    //paddingBottom: 5,
    //alignItems: "center",
    flex: 1,
  },
  largeaction: {
    flexDirection: "row",
    //marginTop: 10,
    //marginBottom: 10,
    //borderTopWidth: 2,
    borderTopColor: "#f2f2f2",
    borderBottomWidth: 2,
    borderBottomColor: "#f2f2f2",
    //paddingBottom: 5,
    //alignItems: "center",
    flex: 1,
  },
  textbox: {
    //borderWidth: 2,
    fontWeight: "bold",
    //alignItems: "center",
    //paddingTop: 6,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    //borderWidth: 2,
    flex: 1,
    paddingTop: 0,
    paddingBottom: 30,
    marginTop: 0, //Platform.OS === "ios" ? 0 : -12,
    //paddingLeft: 20,
    color: "#05375a",
    //borderWidth: 2,
    //height: 30,
    //width: 290,
    //paddingBottom: 6,
    minWidth: "100%",
  },
  textAreaContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderColor: "grey",
    //borderWidth: 1,
    width: 250,
    paddingRight: 2,
    //padding: 5,
  },
  textArea: {
    //flex: 0.5,
    //borderWidth: 2,
    paddingRight: 4,
    width: 250,
    height: 80,
    justifyContent: "flex-start",
    //borderWidth: 2,
    //marginBottom: 2,
  },
  textInput2: {
    //borderWidth: 2,
    flex: 2,
    paddingTop: 0,
    paddingBottom: 70,
    marginTop: 0, //Platform.OS === "ios" ? 0 : -12,
    //paddingLeft: 20,
    color: "#05375a",
    height: 95,
    //height: 30,
    //width: 290,
    //paddingBottom: 6,
  },
  actualInput: {
    //borderWidth: 2,
    width: 250,
    flexDirection: "row",
    //paddingTop: 10,
  },
  actualInput2: {
    //borderWidth: 2,
    width: 250,
    flexDirection: "row",
    //paddingTop: 10,
  },
  textWrapper: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    //padding: 10,
    //borderWidth: 2,
    flex: 1,
  },
  textStyle: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    textAlignVertical: "top",
    //paddingBottom: 2,
    //borderWidth: 2,
  },
});
