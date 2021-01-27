import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { firebase } from "../firebase/config";

import HomeNavigator from "./HomeNavigator";
import DrawerContent from "./DrawerContent";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import HousematesScreen from "../screens/HousematesScreen/HousematesScreen";
import SuppliesScreen from "../screens/SuppliesScreen/SuppliesScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";

const PageDrawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
};

export default function PageNavigator(props) {
  return (
    <PageDrawer.Navigator
      // screenOptions={screenOptionStyle}
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home"
      drawerOpenRoute="OpenDrawer"
      lazy={false}
    >
      <PageDrawer.Screen name="Home" component={HomeScreen} />
      <PageDrawer.Screen name="Supplies" component={SuppliesScreen} />
      <PageDrawer.Screen name="Housemates" component={HousematesScreen} />
      <PageDrawer.Screen name="Settings" component={SettingsScreen} />
    </PageDrawer.Navigator>
  );
}
