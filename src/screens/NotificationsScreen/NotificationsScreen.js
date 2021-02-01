import React from "react";
import {View, Platform, Header, Text, StyleSheet, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";

import { openDrawer } from "../../../App"

export default class NotificationsScreen extends React.Component{

  render(){
    return (
      <View 
      style={styles.container}>
          <Text>Notifications</Text>
      </View>
    )
  }

  static navigationOptions = {
    title: 'Notifications',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: 60,
      alignSelf: 'center', 
      alignItems: 'center',
      fontWeight: 'bold',
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
