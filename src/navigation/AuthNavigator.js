import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegistrationScreen } from "../../src/screens";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const AuthNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}> 
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
