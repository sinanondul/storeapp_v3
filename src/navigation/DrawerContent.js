import React from "react";
import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import firebase from "firebase";
import Icon from "react-native-vector-icons/Ionicons";

import {
  getFullName,
  getAvatar,
  getHandle,
  getDepartment,
  getFollowingCount,
  getFollowersCount,
} from "../functions/UserInfoFormatter";
import styles from "./styles";

export default class DrawerContent extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.userInfoSection}>
          <TouchableOpacity
            style={styles.userInfoWrapper}
            onPress={() =>
              this.props.navigation.navigate("Profile", {
                userInfo: this.props.userData,
              })
            }
          >
            <View style={styles.userAvatar}>
              {getAvatar(this.props.userData, 50)}
            </View>
            <View style={styles.userTextWrapper}>
              <View style={styles.userName}>
                <Text style={styles.userNameText}>
                  {getFullName(this.props.userData)}
                </Text>
                <Text style={styles.handleText}>
                  @{getHandle(this.props.userData)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", marginLeft: 20, marginBottom: 18 }}
          >
            <Text style={{ fontWeight: "500", color: "#FFF", marginRight: 15 }}>
              {getFollowersCount(this.props.userData) + " "}
              <Text style={{ fontWeight: "100", color: "#FFF" }}>
                Followers
              </Text>
            </Text>

            <Text style={{ fontWeight: "500", color: "#FFF" }}>
              {getFollowingCount(this.props.userData) + " "}
              <Text style={{ fontWeight: "100", color: "#FFF" }}>
                Following
              </Text>
            </Text>
          </View>
          <View></View>
        </View>

        <View style={styles.topDrawerSection}>
          <DrawerContentScrollView>
            <View style={styles.drawerContent}>
              <View styles={styles.drawerSection}>
                <Drawer.Section>
                  <DrawerItem
                    icon={({ color, size }) => (
                      <Icon
                        name={
                          Platform.OS === "ios"
                            ? "people-circle-outline"
                            : "people-circle-outline"
                        }
                        color={color}
                        size={size}
                      />
                    )}
                    label="Social"
                    labelStyle={styles.drawerItem}
                    onPress={() => {
                      this.props.navigation.navigate("Home");
                    }}
                  />

                  <DrawerItem
                    icon={({ color, size }) => (
                      <Icon
                        name={
                          Platform.OS === "ios"
                            ? "school-outline"
                            : "school-outline"
                        }
                        color={color}
                        size={size}
                      />
                    )}
                    label="Courses"
                    labelStyle={styles.drawerItem}
                    onPress={() => {
                      this.props.navigation.navigate("Courses");
                    }}
                  />

                  <DrawerItem
                    icon={({ color, size }) => (
                      <Icon
                        name={
                          Platform.OS === "ios"
                            ? "cart-outline"
                            : "cart-outline"
                        }
                        color={color}
                        size={size}
                      />
                    )}
                    label="Supplies"
                    labelStyle={styles.drawerItem}
                    onPress={() => {
                      this.props.navigation.navigate("Supplies");
                    }}
                  />

                  <DrawerItem
                    icon={({ color, size }) => (
                      <Icon
                        name={
                          Platform.OS === "ios"
                            ? "home-outline"
                            : "home-outline"
                        }
                        color={color}
                        size={size}
                      />
                    )}
                    label="Housemates"
                    labelStyle={styles.drawerItem}
                    onPress={() => {
                      this.props.navigation.navigate("Housemates");
                    }}
                  />

                  <DrawerItem
                    icon={({ color, size }) =>
                      getAvatar(this.props.userData, 25)
                    }
                    label="Profile"
                    labelStyle={styles.drawerItem}
                    onPress={() => {
                      this.props.navigation.navigate("Profile", {
                        userData: this.props.userData,
                      });
                    }}
                  />
                  <DrawerItem
                    icon={({ color, size }) => (
                      <Icon
                        name={
                          Platform.OS === "ios"
                            ? "planet-outline"
                            : "planet-outline"
                        }
                        color={color}
                        size={size}
                      />
                    )}
                    label="Sponsored"
                    labelStyle={styles.drawerItem}
                    onPress={() => {
                      this.props.navigation.navigate("Sponsored");
                    }}
                  />
                </Drawer.Section>
              </View>
            </View>
          </DrawerContentScrollView>
        </View>

        <View style={styles.bottomDrawerSection}>
          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name={Platform.OS === "ios" ? "help-outline" : "help-outline"}
                  color={color}
                  size={size}
                />
              )}
              label="Help"
              labelStyle={styles.drawerItem}
              onPress={() => {
                this.props.navigation.navigate("Onboarding");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name={
                    Platform.OS === "ios"
                      ? "settings-outline"
                      : "settings-outline"
                  }
                  color={color}
                  size={size}
                />
              )}
              label="Settings"
              labelStyle={styles.drawerItem}
              onPress={() => {
                this.props.navigation.navigate("Settings");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name={Platform.OS === "ios" ? "exit-outline" : "exit-outline"}
                  color={color}
                  size={size}
                />
              )}
              label="Logout"
              labelStyle={styles.drawerItem}
              onPress={() => {
                onLogoutButtonPress({ ...this.props });
              }}
            />
          </Drawer.Section>
        </View>
      </View>
    );
  }
}

const onLogoutButtonPress = ({ props }) => {
  firebase
    .auth()
    .signOut()
    .then(
      () => {},
      function (error) {
        console.log("didnotgoback");
        // An error happened.
      }
    );
};
