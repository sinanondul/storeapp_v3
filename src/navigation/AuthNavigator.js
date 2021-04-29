import React from "react";
import {Platform} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegistrationScreen } from "../../src/screens";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#2890cf",
  },
  headerTitleStyle: {
    flex: 0.6,
    alignSelf: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const registrationOptionStyle = {
  headerStyle: {
    backgroundColor: "#2890cf",
  },
  headerTitleStyle: {
    flex: 0.6,
    paddingRight: Platform.OS === "ios" ? 0 : 60,
    alignSelf: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const AuthNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={screenOptionStyle}/>
      <Stack.Screen name="Registration" component={RegistrationScreen} options={registrationOptionStyle}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
