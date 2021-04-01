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

import { getFullName, getAvatar } from "../functions/UserInfoFormatter";
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
              </View>
              <View></View>
            </View>
          </TouchableOpacity>
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
                        name={Platform.OS === "ios" ? "ios-home" : "md-home"}
                        color={color}
                        size={size}
                      />
                    )}
                    label="Home"
                    labelStyle={styles.drawerItem}
                    onPress={() => {
                      this.props.navigation.navigate("Home");
                    }}
                  />

                  <DrawerItem
                    icon={({ color, size }) => (
                      <Icon
                        name={Platform.OS === "ios" ? "ios-home" : "md-home"}
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
                        name={Platform.OS === "ios" ? "ios-home" : "md-home"}
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
                        name={Platform.OS === "ios" ? "ios-home" : "md-home"}
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
                    icon={({ color, size }) => (
                      <Icon
                        name={Platform.OS === "ios" ? "ios-home" : "md-home"}
                        color={color}
                        size={size}
                      />
                    )}
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
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name={Platform.OS === "ios" ? "ios-help" : "md-help"}
                  color={color}
                  size={size}
                />
              )}
              label="Help"
              labelStyle={styles.drawerItem}
              onPress={() => {
                this.props.navigation.navigate("Onboarding");
              }}
            /> */}
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
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
                  name={Platform.OS === "ios" ? "ios-exit" : "md-exit"}
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
