import React from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


import firebase from "firebase";

import { openDrawer } from "../../../App";
import DefaultFooter from "../../components/DefaultFooter";
import FeedList from './components/FeedList';
import FeedItem from "./components/FeedItem";
import styles from "./styles";

const Tab = createMaterialTopTabNavigator();
export default class LandingScreen extends React.Component {
  state = {
    posts: [],
    currentPost: [],
  };
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({ item }) => {
    return (
      <FeedItem {...this.props} post={item} profileRoute={"ProfileFromHome"} />
    );
  };

  componentDidMount() {
    let postsArray = [];
    this._unsubscribe = firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", 'desc')
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();

        changes.forEach((change) => {
          if (change.type === "added") {
            const newPost = change.doc.data();
            const uped = change.doc.id in this.props.userData.upedPosts;
            const faved = change.doc.id in this.props.userData.favPosts;
            const newPostData = {
              id: change.doc.id,
              name: newPost.name,
              text: newPost.text,
              timestamp: newPost.timestamp,
              image: newPost.image,
              senderId: newPost.uid,
              upCount: newPost.upCount,
              comments: newPost.comments,
              uped: uped,
              faved: faved,
            };
            postsArray.push(newPostData);
          }
        });
        this.setState({ posts: postsArray });
      });
  }


  componentWillUnmount() {
    this._unsubscribe();
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="All">
            {(props) => <FeedList {...props} {...this.props} followingOnly={false}/>}
          </Tab.Screen>
          <Tab.Screen name="Following">
            {(props) => <FeedList {...props} {...this.props} followingOnly={true}/>}
          </Tab.Screen>
        </Tab.Navigator>
        <DefaultFooter {...this.props} />
      </SafeAreaView>
    );
  }

  static navigationOptions = {
    title: <Text style={{ alignItems: "center" }}>Home</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#ffff",
    headerTitleStyle: {
      flex: 0.6,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
      alignItems: "center",
      justifyContent: "center",
    },
    headerLeft: () => (
      <Icon
        name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
        style={{ marginLeft: 10 }}
        size={40}
        color="#ffff"
        onPress={() => openDrawer()}
      />
    ),
    headerRight: () => (
      <Icon
        name="filter-circle-outline"
        style={{ marginRight: 12 }}
        size={30}
        color="#fff"
        //onPress={() => this.props.navigation.navigate("EditProfile")}
      />
    ),
  };
}
