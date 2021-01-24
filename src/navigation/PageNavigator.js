import React from "react";
import HomeNavigator from "./HomeNavigator";
import SuppliesNavigator from "./SuppliesNavigator";
import HousematesNavigator from "./HousematesNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";

const PageDrawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
};

export default function PageNavigator({ navigation }) {
  return (
    <PageDrawer.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="Home"
      drawerOpenRoute="OpenDrawer"
    >
      <PageDrawer.Screen name="Home" component={HomeNavigator} />
      <PageDrawer.Screen name="Supplies" component={SuppliesNavigator} />
      <PageDrawer.Screen name="Housemates" component={HousematesNavigator} />
      {/* <PageDrawer.Screen name="Logout" component={onLogoutPress} /> */}
    </PageDrawer.Navigator>
  );
}

// function onLogoutPress({ navigation }) {
//       .auth()
//       .signOut()
//       .then(
//         () => {
//         },
//         function (error) {
//           console.log("didnotgoback");
//           // An error happened.
//         }
//       );
// }
