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

import { getFullName, getAvatar } from "../../functions/UserInfoFormatter";
import { openDrawer } from "../../../App";

import MyPostFeedItem from "../../screens/ProfileScreen/MyPostFeedItem";
import styles from "./styles";

export default class LandingScreen extends React.Component {
  state = {
    posts: [],
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
    //Navigation update.
    this.props.navigation.setOptions({
      headerLeft: () =>
        this.props.userData.uid !== this.props.userInfo.uid ? (
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
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              {getAvatar(this.props.userInfo, 140)}
            </View>
            {otherProfile ? (
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
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
                  <MaterialIcons name="chat" size={18} color="#DFD8C8" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.add}>
                  <Ionicons
                    name="ios-add"
                    size={36}
                    color="#DFD8C8"
                    style={{ marginTop: 3 }}
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {getFullName(this.props.userInfo)}
            </Text>
            <Text style={[styles.text, { color: "gray", fontSize: 18 }]}>
              @USER_HANDLE
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              Computer Science
            </Text>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" />
              <Text>Ankara, Turkey</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" />
              <Text>+901231832183</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" />
              <Text>{this.props.userData.email}</Text>
            </View>
          </View>
          {/* TODO */}
          <View style={styles.infoBoxWrapper}>
            <View
              style={
                (styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                })
              }
            >
              <Title>140</Title>
              <Caption>Followers</Caption>
            </View>
            <View
              style={
                (styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                })
              }
            >
              <Title>23</Title>
              <Caption>Following</Caption>
            </View>
            <View
              style={
                (styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                })
              }
            >
              <Title>19</Title>
              <Caption>Posts</Caption>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
                >
                  Started following{" "}
                  <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and{" "}
                  <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                </Text>
              </View>
            </View>

            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
                >
                  Started following{" "}
                  <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                </Text>
              </View>
            </View>
          </View>

          <FlatList
            style={styles.myposts}
            //horizontal
            data={this.state.posts.sort((a, b) => b.timestamp - a.timestamp)}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
          />
          <View style={styles.menuWrapper}>
            {/*"TODO"*/}
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <Icon name="heart-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Favorite Posts</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <Icon name="credit-card-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Payment</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <Icon name="share-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Share with Friends</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <Icon name="account-check-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Support</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <Icon name="account-settings" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Account Settings</Text>
              </View>
            </TouchableOpacity>
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
  };
}
