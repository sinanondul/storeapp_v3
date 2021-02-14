import React from "react";
import { Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigator from "./HomeNavigator";
import DrawerContent from "./DrawerContent";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import HousematesScreen from "../screens/HousematesScreen/HousematesScreen";
import SuppliesScreen from "../screens/SuppliesScreen/SuppliesScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import Onboarding from "../screens/Onboarding";

const PageDrawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
};

const PageNavigator = (props) => {
  var userData = props.userData;
  return (
    <PageDrawer.Navigator
      // screenOptions={screenOptionStyle}
      drawerContent={(props) => (
        <DrawerContent {...props} userData={userData} />
      )}
      initialRouteName="Home"
      drawerOpenRoute="OpenDrawer"
      lazy={false}
    >
      <PageDrawer.Screen name="Home">
        {(props) => <HomeScreen {...props} userData={userData} />}
      </PageDrawer.Screen>
      <PageDrawer.Screen name="Supplies" component={SuppliesScreen} />
      <PageDrawer.Screen name="Housemates" component={HousematesScreen} />
      <PageDrawer.Screen name="Profile">
        {(props) => <ProfileScreen {...props} userData={userData} />}
      </PageDrawer.Screen>
      <PageDrawer.Screen name="Settings" component={SettingsScreen} />
      <PageDrawer.Screen name="Onboarding" component={Onboarding} />
    </PageDrawer.Navigator>
  );
};

export default PageNavigator;
