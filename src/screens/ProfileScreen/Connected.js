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
import MyPosts from "./MyPosts";
import FollowerScreen from "./FollowerScreen";
import FollowingScreen from "./FollowingScreen";

import styles from "./styles";
const Tab = createMaterialTopTabNavigator();
export default class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  //TODO- PASS fromFollowing in correct way
  state = {
    focusRefresh: false,
    posts: [],
    initial: null,
  };

  static navigationOptions = ({ route, navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
    const otherProfile = this.props.userData.uid !== this.props.userInfo.uid;
    this.props.navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name={"arrow-back"}
          size={30}
          color="#000"
          tintColor={"#fff"}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      ),

      headerRight: () => (
        <Icon name="account-edit" style={{ marginRight: 10 }} size={30} />
      ),
    });

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

  render() {
    const otherProfile = this.props.userData.uid !== this.props.userInfo.uid;
    const userData = this.props.userData;
    const fromFollowing = this.props.fromFollowing;
    return (
      <SafeAreaView style={styles.container} nestedScrollEnabled={true}>
        <View
          style={{
            //marginTop: 10,
            height: Dimensions.get("window").height - 56,
            flex: 1,
          }}
        >
          <Tab.Navigator
            headerMode={false}
            initialRouteName={fromFollowing ? "Following" : "Following"}
            tabBarOptions={{
              labelStyle: {
                fontSize: 11,
              },
            }}
            lazy={false}
            style={{ flex: 1 }}
          >
            <Tab.Screen name="Followers">
              {(props) => (
                <FollowerScreen
                  {...props}
                  userData={this.props.userData}
                  userInfo={this.props.userInfo}
                  fromFollowing="Followers"
                />
              )}
            </Tab.Screen>

            <Tab.Screen name="Following">
              {(props) => (
                <FollowingScreen
                  {...props}
                  userData={this.props.userData}
                  userInfo={this.props.userInfo}
                  fromFollowing="Following"
                />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    );
  }

  static navigationOptions = {
    title: <Text>Profile</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },

    //headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
    headerRight: () => <View style={{ width: "20%" }}></View>,
  };
}
