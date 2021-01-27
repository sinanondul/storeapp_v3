import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SuppliesScreen from "../screens/SuppliesScreen/SuppliesScreen";
import AddScreen from "../screens/SuppliesScreen/AddScreen";
import { createStackNavigator } from "@react-navigation/stack";

const SuppliesStack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
    },
  };

const SuppliesNavigator = ({navigation}) => {
  return (
    <SuppliesStack.Navigator 
      screenOptions={screenOptionStyle}
      initialRouteName='Landing'
    >
      <SuppliesStack.Screen name="Landing" component={SuppliesScreen} options={SuppliesScreen.navigationOptions}/>
      <SuppliesStack.Screen name="Add" component={AddScreen}/>
    </SuppliesStack.Navigator>
  );
};


export default SuppliesNavigator;
