import React from "react";
import {View, Platform, Header, Text, StyleSheet, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { openDrawer } from "../../../../App"

const ProfileStack = createStackNavigator();

export default function Profile({navigation}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={ProfileScreen.navigationOptions}/>
    </ProfileStack.Navigator>
  );
}

class ProfileScreen extends React.Component{

  render(){
    return (
      <View 
      style={styles.container}>
          <Text>Profile</Text>
      </View>
    )
  }

  static navigationOptions = {
    title: 'Profile',
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
