import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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

import Fire from "../firebase/Fire";
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

export default class DrawerContent extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 40 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                <Avatar.Text size={50} label="P" marginLeft={15}></Avatar.Text>
              </TouchableOpacity>                
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
