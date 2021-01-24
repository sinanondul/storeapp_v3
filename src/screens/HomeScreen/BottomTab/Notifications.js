import React from "react";
import {View, Platform, Header, Text, StyleSheet, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { openDrawer } from "../../../../App"

const NotificationsStack = createStackNavigator();

export default function Notifications({ navigation }) {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen name="Notifications" component={NotificationScreen} options={NotificationScreen.navigationOptions}/>
    </NotificationsStack.Navigator>
  );
}

class NotificationScreen extends React.Component{

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
    headerLeft: () => (
      <Icon 
          name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
          style={{marginLeft:10}}
          size={40}
          color='#fff'
          onPress={() => openDrawer()}
          // onPress={() => Alert.alert('Hello world!')}
      />
    ),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
