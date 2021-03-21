import React from "react";
import {
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import { HeaderBackButton } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Fire from "../../firebase/Fire";
import firebase from "firebase";

import {
  getFullName,
  getAvatar,
  getHandle,
  getPhone,
  getLocation,
  getAbout,
  getDepartment,
} from "../../functions/UserInfoFormatter";
import { openDrawer } from "../../../App";

import MyPostFeedItem from "../../screens/ProfileScreen/MyPostFeedItem";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyPosts from "./MyPosts";

import styles from "./styles";
const Tab = createMaterialTopTabNavigator();
export default class LandingScreen extends React.Component {
  state = {
    posts: [],
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
    const otherProfile = this.props.userData.uid !== this.props.userInfo.uid;
    var paddingRight = 0;
    if (otherProfile) {
      paddingRight = 60;
    }
    //Navigation update.
    this.props.navigation.setOptions({
      headerLeft: () =>
        this.props.fromFeed ? (
          <HeaderBackButton
            tintColor={"#fff"}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        ) : (
          <Ionicons
            name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
            style={{ marginLeft: 10 }}
            size={40}
            color="#fff"
            onPress={() => openDrawer()}
          />
        ),
      headerRight: () =>
        this.props.userData.uid === this.props.userInfo.uid ? (
          <Icon
            name="account-edit"
            style={{ marginRight: 10 }}
            size={30}
            color="#fff"
            onPress={() => this.props.navigation.navigate("EditProfile")}
          />
        ) : null,
      headerTitleStyle: {
        flex: 0.6,
        paddingRight: paddingRight,
        alignSelf: "center",
        alignItems: "center",
        fontWeight: "bold",
      },
    });

    //Getting own posts.

    let postsArray = [];
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", this.props.userInfo.uid)
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();

        changes.forEach((change) => {
          if (change.type === "added") {
            const newPost = change.doc.data();
            const newPostData = {
              id: change.doc.id,
              name: newPost.name,
              text: newPost.text,
              timestamp: newPost.timestamp,
              image: newPost.image,
              senderId: newPost.uid,
            };
            postsArray.unshift(newPostData);
          }
        });
        this.setState({ posts: postsArray });
      });

    //Checking if own profile.
  }

  renderItem = ({ item }) => {
    return <MyPostFeedItem post={item} />;
  };

  render() {
    const otherProfile = this.props.userData.uid !== this.props.userInfo.uid;
    const postarr = this.state.posts;
    return (
      <SafeAreaView style={styles.container} nestedScrollEnabled={true}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          //keyboardShouldPersistTaps='handled'
          style={{ flex: 1 }}
        >
          <View style={styles.profileTop}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                {getAvatar(this.props.userInfo, 80)}
              </View>
              {otherProfile ? (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.dm}
                    onPress={() => {
                      Fire.shared
                        .addChat({
                          participantIds: [
                            this.props.userData.uid,
                            this.props.userInfo.uid,
                          ],
                        })
                        .then((chatInfo) => {
                          return this.props.navigation.navigate(
                            "MessagingFromProfile",
                            { senderInfo: this.props.userInfo, chat: chatInfo }
                          );
                        });
                    }}
                  >
                    <MaterialIcons name="mail" size={18} color="#DFD8C8" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.follow}>
                    <Ionicons
                      name="add"
                      size={15}
                      color="#DFD8C8"
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Text style={{ fontSize: 15, alignSelf: "center" }}>
                        Follow
                      </Text>
                    </Ionicons>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "500", fontSize: 20 }]}>
                {getFullName(this.props.userInfo)}
              </Text>
              <Text style={[styles.text, { color: "gray", fontSize: 14 }]}>
                @{getHandle(this.props.userInfo)}
              </Text>
              <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
                {getDepartment(this.props.userInfo)}
              </Text>
              <Text
                style={[
                  styles.text,
                  { color: "black", fontSize: 14, width: 200, paddingTop: 10 },
                ]}
              >
                {getAbout(this.props.userInfo)}
              </Text>
            </View>

            <View style={styles.userInfoSection}>
              {/* <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" />
              <Text>Ankara, Turkey</Text>
            </View> */}
              <View style={styles.row}>
                <Icon name="phone" color="#777777" />
                <Text>{getPhone(this.props.userInfo)}</Text>
              </View>
              <View style={styles.row}>
                <Icon name="email" color="#777777" />
                <Text>{this.props.userData.email}</Text>
              </View>
            </View>
            <View style={styles.userInfoSectionLower}>
              <View style={styles.row}>
                <Icon name="map" color="#777777" />
                <Text>{getLocation(this.props.userInfo)}</Text>
              </View>
            </View>

            {/* TODO */}
            <View style={styles.infoBoxWrapper}>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "500" }}>
                  140{/* {getFollowers(this.props.userInfo)} */}
                  <Text style={{ fontWeight: "100" }}> Followers</Text>
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "500" }}>
                  200{/* {getFollowing(this.props.userInfo)} */}
                  <Text style={{ fontWeight: "100" }}> Following</Text>
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "500" }}>
                  30 {/* {getPostCount(this.props.userInfo)} */}
                  <Text style={{ fontWeight: "100" }}> Posts</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10, height: 1000, flex: 1 }}>
            <Tab.Navigator
              headerMode={false}
              initialRouteName="My Posts"
              tabBarOptions={{
                labelStyle: {
                  fontSize: 11,
                },
              }}
              style={{ flex: 1 }}
            >
              <Tab.Screen name="My Posts" style={{ flex: 1 }}>
                {() => <MyPosts {...this.props} posts={postarr} />}
              </Tab.Screen>
              <Tab.Screen name="Posts & comments">{(props) => null}</Tab.Screen>
              <Tab.Screen name="UP'd Posts">{(props) => null}</Tab.Screen>
              {otherProfile ? null : (
                <Tab.Screen name="Saved">{(props) => null}</Tab.Screen>
              )}
            </Tab.Navigator>
          </View>
          {/* <MyPosts {...this.props} posts={this.state.posts} /> */}
        </ScrollView>
      </SafeAreaView>
    );
  }

  static navigationOptions = {
    title: <Text>Pass Params Here</Text>,
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
  };
}
// {/* <FlatList
//   style={styles.myposts}
//   //horizontal
//   data={this.state.posts.sort((a, b) => b.timestamp - a.timestamp)}
//   renderItem={this.renderItem}
//   keyExtractor={(item) => item.id}
//   showsVerticalScrollIndicator={true}
// /> */}
// {/* <View style={styles.menuWrapper}>
//   <TouchableOpacity>
//     <View style={styles.menuItem}>
//       <Icon name="heart-outline" color="#FF6347" size={25} />
//       <Text style={styles.menuItemText}>Favorite Posts</Text>
//     </View>
//   </TouchableOpacity>
//   <TouchableOpacity>
//     <View style={styles.menuItem}>
//       <Icon name="credit-card-outline" color="#FF6347" size={25} />
//       <Text style={styles.menuItemText}>Payment</Text>
//     </View>
//   </TouchableOpacity>
//   <TouchableOpacity>
//     <View style={styles.menuItem}>
//       <Icon name="share-outline" color="#FF6347" size={25} />
//       <Text style={styles.menuItemText}>Share with Friends</Text>
//     </View>
//   </TouchableOpacity>
//   <TouchableOpacity>
//     <View style={styles.menuItem}>
//       <Icon name="account-check-outline" color="#FF6347" size={25} />
//       <Text style={styles.menuItemText}>Support</Text>
//     </View>
//   </TouchableOpacity>
//   <TouchableOpacity>
//     <View style={styles.menuItem}>
//       <Icon name="account-settings" color="#FF6347" size={25} />
//       <Text style={styles.menuItemText}>Account Settings</Text>
//     </View>
//   </TouchableOpacity>
// </View> */}
