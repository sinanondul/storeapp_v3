import React from "react";
import {View, Text, Platform} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";

import LandingScreen from "../screens/SuppliesScreen/LandingScreen";
import MessagesScreen from "../screens/MessagesScreen/MessagesScreen";
import AddScreen from "../screens/SuppliesScreen/AddScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";

const SuppliesStack = createStackNavigator();

const SuppliesBottomTab = createBottomTabNavigator();

function SuppliesTabNavigator(){
  const navigation = useNavigation();
  return(
    <SuppliesBottomTab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {height: 60}
      }}
    >
      <SuppliesBottomTab.Screen name="MessagesFiller" component={LandingScreen} options={{
          tabBarIcon: ({tintColor}) => <Icon 
            name={Platform.OS === "ios" ? "ios-chatbubbles-outline" : "md-chatbubbles-outline"}
            size={24}
            color={tintColor}
          />
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
      
            // Do something with the `navigation` object
            navigation.navigate('Messages');
          },
        })}
      />
      <SuppliesBottomTab.Screen name="AddFiller" component={LandingScreen} options= {{
          tabBarIcon: ({tintColor}) => <Icon
            name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
            size={48}
            color="#f4511e"
            style={{
              shadowColor: "#f4511e",
              shadowOffset: {width:0, height:0},
              shadowRadius: 10,
              shadowOpacity: 0.3
            }}
          />
          }}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
        
              // Do something with the `navigation` object
              navigation.navigate('Add');
            },
          })}
        />
      <SuppliesBottomTab.Screen name="NotificationsFiller" component={LandingScreen} options={{
          tabBarIcon: ({tintColor}) => <Icon 
            name={Platform.OS === "ios" ? "ios-notifications-outline" : "md-notifications-outline"}
            size={24}
            color={tintColor}
          />
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
      
            // Do something with the `navigation` object
            navigation.navigate('Notifications');
          },
        })}
      />
    </SuppliesBottomTab.Navigator>
  );
}

export default function SuppliesNavigator() {
  return (
    <SuppliesStack.Navigator
    options={{
    }}
    >
      <SuppliesStack.Screen name="Default" component={SuppliesTabNavigator} options={LandingScreen.navigationOptions}/>
      <SuppliesStack.Screen name="Messages" component={MessagesScreen} options={MessagesScreen.navigationOptions}/>
      <SuppliesStack.Screen name="Add" component={AddScreen} options={AddScreen.navigationOptions} />
      <SuppliesStack.Screen name="Notifications" component={NotificationsScreen} options={NotificationsScreen.navigationOptions} />
    </SuppliesStack.Navigator>
  );
}