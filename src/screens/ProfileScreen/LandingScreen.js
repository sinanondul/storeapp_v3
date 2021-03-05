import React from "react";
import {
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { openDrawer } from "../../../App";
import styles from "./styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

function getFullName(info) {
  return info.name + " " + info.surename;
}

function getAvatarTag(info) {
  return (info.name.charAt(0) + info.surename.charAt(0)).toUpperCase();
}

function getAvatar(info) {
  if (!(info.avatar == null)) {
    return (
      <Avatar.Image
        size={140}
        marginLeft={0}
        rounded={false}
        source={info.avatar}
      />
    );
  } else {
    return (
      <Avatar.Text
        size={140}
        label={getAvatarTag(info)}
        marginLeft={0}
        rounded={false}
        style={{ backgroundColor: "#f4511e" }}
      />
    );
  }
}

export default class LandingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Icon
          name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
          style={{ marginRight: 10 }}
          size={30}
          color="#fff"
          onPress={() => this.props.navigation.navigate("Settings")}
        />
      ),
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              {getAvatar(this.props.userData)}
            </View>
            <View style={styles.dm}>
              <MaterialIcons
                name="chat"
                size={18}
                color="#DFD8C8"
              ></MaterialIcons>
            </View>
            <View style={styles.add}>
              <Ionicons
                name="ios-add"
                size={36}
                color="#DFD8C8"
                style={{ marginTop: 3 }}
              ></Ionicons>
            </View>
          </View> */}
          <View /*style={styles.userInfoSection}*/>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                {getAvatar(this.props.userData)}
              </View>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {getFullName(this.props.userData)}
            </Text>
            <Text style={[styles.text, { color: "gray", fontSize: 18 }]}>
              @USER_HANDLE
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              Computer Science
            </Text>
          </View>

          <View
            style={[
              styles.userInfoSection,
              { alignItems: "center", marginTop: 15 },
            ]}
          >
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
              <Text>email@domain.com</Text>
            </View>
          </View>
          {/* TODO */}
          <View
            style={[
              styles.InfoBoxWrapper,
              { flexDirection: "row", justifyContent: "center" },
            ]}
          >
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
          <View style={styles.menuWrapper}>
            {/*"TODO"*/}
            <TouchableRipple>
              <View style={styles.menuItem}>
                <Icon name="heart-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Favorite Posts</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple>
              <View style={styles.menuItem}>
                <Icon name="credit-card-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Payment</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple>
              <View style={styles.menuItem}>
                <Icon name="share-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Share with Friends</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple>
              <View style={styles.menuItem}>
                <Icon name="account-check-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Support</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple>
              <View style={styles.menuItem}>
                <Icon name="account-settings" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>AccountSettings</Text>
              </View>
            </TouchableRipple>
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
    headerLeft: () => (
      <Icon
        name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
        style={{ marginLeft: 10 }}
        size={40}
        color="#fff"
        onPress={() => openDrawer()}
        // onPress={() => Alert.alert('Hello world!')}
      />
    ),
  };
}
