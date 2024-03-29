import React from "react";
import {
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import { HeaderBackButton } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Fire from "../../firebase/Fire";
import firebase from "firebase";
import Ad from "../../components/Ad";
import CommentsModal from "../HomeScreen/components/CommentsModal";

import {
  getFullName,
  getAvatar,
  getHandle,
  getPhone,
  getLocation,
  getAbout,
  getDepartment,
  getFollowersCount,
  getFollowingCount,
  getPostCount,
} from "../../functions/UserInfoFormatter";
import { openDrawer } from "../../../App";

import MyPostFeedItem from "../../screens/ProfileScreen/MyPostFeedItem";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostList from "./components/PostList";
import FollowButton from "./components/FollowButton";

import styles from "./styles";
const Tab = createMaterialTopTabNavigator();
export default class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCommentsModal = this.toggleCommentsModal.bind(this);
    this.userInfoHandler = this.userInfoHandler.bind(this);
    this.followerHandler = this.followerHandler.bind(this);
  }

  state = {
    focusRefresh: false,
    commentsModalOpen: false,
    posts: [],
    userInfo: null,
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  myPostsRef;
  upedPostsRef;
  favPostsRef;

  componentDidMount() {
    const otherProfile = this.props.userData.uid !== this.props.userInfo.uid;
    this.setState({userInfo: this.props.userInfo})
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
        !otherProfile ? (
          <TouchableOpacity 
            style={{ marginRight: 10}} 
            onPress={() => this.props.navigation.navigate("EditProfile", {userInfoHandler: this.userInfoHandler})}
          >
            <Text style={{fontSize: 18, color: 'white'}}> Edit </Text>
          </TouchableOpacity>
          // <Icon
          //   name="account-edit"
          //   style={{ marginRight: 10 }}
          //   size={30}
          //   color="#fff"
          //   onPress={() => this.props.navigation.navigate("EditProfile")}
          // />
        ) : null,
    });

    if (this.props.fromFeed) {
      this.props.navigation.setOptions({
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerAvatar}>
              {this.state.userInfo ? getAvatar(this.state.userInfo, 30) : null}
            </View>

            <Text style={styles.headerText}>
              {this.state.userInfo ? getFullName(this.state.userInfo) : null}
            </Text>
          </View>
        ),
      });
    }

    //Focus listener.
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //     if (this.myPostsRef) {
    //       this.myPostsRef.getPosts();
    //     }
    //     if (this.upedPostsRef) {
    //       this.upedPostsRef.getPosts();
    //     }
    //     if (this.favPostsRef) {
    //       this.favPostsRef.getPosts();
    //     }
    // })
  }

  toggleCommentsModal(postInfo = null) {
    this.setState({
      commentsModalOpen: !this.state.commentsModalOpen,
      modalPostInfo: postInfo,
    });
  }

  userInfoHandler(userInfo){
    this.setState({userInfo: {...this.state.userInfo, ...userInfo}});
  }

  followerHandler(add) {
    let newUserInfo = this.state.userInfo;
    if (add) {
      newUserInfo.followers[this.props.userData.uid] = Date.now();
    }
    else {
      if (newUserInfo.followers[this.props.userData.uid]) {
       delete newUserInfo.followers[this.props.userData.uid]
      }
    }
    this.setState({userInfo: newUserInfo})
  }

  render() {
    const otherProfile = this.props.userData.uid !== this.props.userInfo.uid;
    const userData = this.props.userData;
    var myPosts = this.props.userInfo.myPosts;
    var favPosts = this.props.userInfo.favPosts;
    var upedPosts = this.props.userInfo.upedPosts;

    if (!otherProfile) {
      myPosts = userData.myPosts;
      favPosts = userData.favPosts;
      upedPosts = userData.upedPosts;
    }

    const myPostCount = Object.keys(myPosts).length;
    const favPostCount = Object.keys(favPosts).length;
    const upedPostCount = Object.keys(upedPosts).length;

    return (
      <SafeAreaView style={styles.container} nestedScrollEnabled={true}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={{ flex: 1 }}
        >
          <View style={styles.profileTop}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                {this.state.userInfo ? getAvatar(this.state.userInfo, 80) : null}
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
                          creatorInfo: this.props.userData,
                        })
                        .then((chatInfo) => {
                          console.log(chatInfo);
                          return this.props.navigation.navigate(
                            "MessagingFromProfile",
                            { senderInfo: this.props.userInfo, chat: chatInfo }
                          );
                        });
                    }}
                  >
                    <MaterialIcons name="mail" size={18} color="#DFD8C8" />
                  </TouchableOpacity>

                  <FollowButton
                    userData={userData}
                    targetId={this.props.userInfo.uid}
                    followerHandler={this.followerHandler}
                  />
                </View>
              ) : null}
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "500", fontSize: 20 }]}>
                {this.state.userInfo ? getFullName(this.state.userInfo) : null}
              </Text>
              {(this.state.userInfo ? getHandle(this.state.userInfo) : null) ? (
                <Text style={[styles.text, { color: "gray", fontSize: 14 }]}>
                  {getHandle(this.state.userInfo)}
                </Text>
              ) : null}
              {(this.state.userInfo ? getDepartment(this.props.userInfo) : null) ? (
                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
                  {getDepartment(this.state.userInfo)}
                </Text>
              ) : null}
              {(this.state.userInfo ? getAbout(this.state.userInfo) : null) ? (
                <Text
                  numberOfLines={3}
                  style={[
                    styles.text,
                    {
                      color: "black",
                      fontSize: 14,
                      width: 300,
                      paddingTop: 10,
                      paddingBottom: 5,
                    },
                  ]}
                >
                  {getAbout(this.state.userInfo)}
                </Text>
              ) : null}
            </View>

            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <Icon name="email" color="#777777" size={16} />
                <Text>{" " + (this.state.userInfo ? this.state.userInfo.email : "")}</Text>
              </View>
              {(this.state.userInfo ? getPhone(this.state.userInfo) : null) ? (
                <View style={styles.row}>
                  <Icon name="phone" color="#777777" size={16} />
                  <Text>{" " + getPhone(this.state.userInfo)}</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.userInfoSectionLower}>
              {(this.state.userInfo ? getLocation(this.state.userInfo) : null) ? (
                <View style={styles.row}>
                  <Icon name="map" color="#777777" size={16} />
                  <Text>{" " + getLocation(this.state.userInfo)}</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.infoBoxWrapper}>
              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate("FollowersList")}
                onPress={() =>
                  this.props.navigation.navigate("Connected", {
                    fromFollowing: false,
                  })
                }
              >
                <View style={styles.infoBox}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {(this.state.userInfo ? getFollowersCount(this.state.userInfo) : null)}
                  </Text>

                  <Text style={{ fontWeight: "100" }}> Followers</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate("FollowingList")}
                onPress={() =>
                  this.props.navigation.navigate("Connected", {
                    fromFollowing: true,
                  })
                }
              >
                <View style={styles.infoBox}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {(this.state.userInfo ? getFollowingCount(this.state.userInfo) : null)}
                  </Text>
                  <Text style={{ fontWeight: "100" }}> Following</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 5,
              height: Dimensions.get("window").height - 56,
              flex: 1,
            }}
          >
            <Tab.Navigator
              headerMode={false}
              initialRouteName="Posts"
              tabBarOptions={{
                labelStyle: {
                  fontSize: 11,
                },
              }}
              lazy={false}
              style={{ flex: 1 }}
            >
              <Tab.Screen name={"Posts (" + myPostCount.toString() + ")"}>
                {(props) => (
                  <PostList
                    ref={(child) => {
                      this.myPostsRef = child;
                    }}
                    {...props}
                    userData={userData}
                    postIds={myPosts}
                    ownerId={this.props.ownerId}
                    toggleCommentsModal={this.toggleCommentsModal}
                  />
                )}
              </Tab.Screen>
              {/* <Tab.Screen name="Posts & comments">
                {(props) => null}
              </Tab.Screen> */}
              <Tab.Screen name="UPed Posts">
                {(props) => (
                  <PostList
                    ref={(child) => {
                      this.upedPostsRef = child;
                    }}
                    {...props}
                    userData={userData}
                    postIds={upedPosts}
                    ownerId={this.props.ownerId}
                    toggleCommentsModal={this.toggleCommentsModal}
                  />
                )}
              </Tab.Screen>
              {!otherProfile ? (
                <Tab.Screen name="Favourites">
                  {(props) => (
                    <PostList
                      ref={(child) => {
                        this.favPostsRef = child;
                      }}
                      {...props}
                      userData={userData}
                      postIds={favPosts}
                      ownerId={this.props.ownerId}
                      toggleCommentsModal={this.toggleCommentsModal}
                    />
                  )}
                </Tab.Screen>
              ) : null}
            </Tab.Navigator>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.commentsModalOpen}
              onRequestClose={this.toggleCommentsModal}
            >
              <CommentsModal
                {...this.props}
                toggleCommentsModal={this.toggleCommentsModal}
                post={this.state.modalPostInfo}
              />
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  static navigationOptions = {
    title: <Text>Profile</Text>,
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
    headerRight: () => <View style={{ width: "20%" }}></View>,
  };
}
