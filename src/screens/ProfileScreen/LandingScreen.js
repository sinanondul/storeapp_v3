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
import CommentsModal from '../HomeScreen/components/CommentsModal';

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
import MyPosts from "./MyPosts";

import styles from "./styles";
const Tab = createMaterialTopTabNavigator();
export default class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCommentsModal = this.toggleCommentsModal.bind(this);
  }

  state = {
    focusRefresh: false,
    commentsModalOpen: false,
    posts: [],
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
          <Icon
            name="account-edit"
            style={{ marginRight: 10 }}
            size={30}
            color="#fff"
            onPress={() => this.props.navigation.navigate("EditProfile")}
          />
        ) : null,
    });

    if (this.props.fromFeed) {
      this.props.navigation.setOptions({
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerAvatar}>
              {getAvatar(this.props.userInfo, 30)}
            </View>

            <Text style={styles.headerText}>
              {getFullName(this.props.userInfo)}
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
    this.setState({commentsModalOpen: !this.state.commentsModalOpen, modalPostInfo: postInfo});
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
    return (
      <SafeAreaView style={styles.container} nestedScrollEnabled={true}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={{ flex: 1 }}
        >
          <Ad />
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

                  <FollowButton
                    userData={userData}
                    targetId={this.props.userInfo.uid}
                  />
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
              <View style={styles.row}>
                <Icon name="phone" color="#777777" />
                <Text>{getPhone(this.props.userInfo)}</Text>
              </View>
              <View style={styles.row}>
                <Icon name="email" color="#777777" />
                <Text>{this.props.userInfo.email}</Text>
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("FollowersList")}
              >
                <View style={styles.infoBox}>
                  <Text style={{ fontWeight: "500" }}>
                    {getFollowersCount(this.props.userInfo)}
                    <Text style={{ fontWeight: "100" }}> Followers</Text>
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("FollowingList")}
              >
                <View style={styles.infoBox}>
                  <Text style={{ fontWeight: "500" }}>
                    {getFollowingCount(this.props.userInfo)}
                    <Text style={{ fontWeight: "100" }}> Following</Text>
                  </Text>
                </View>
              </TouchableOpacity>

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

          <View
            style={{
              marginTop: 10,
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
              <Tab.Screen name="Posts">
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
            </Tab.Navigator>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.commentsModalOpen}
              onRequestClose={this.toggleCommentsModal}
            >
              <CommentsModal {...this.props} toggleCommentsModal={this.toggleCommentsModal} post={this.state.modalPostInfo}/>
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
