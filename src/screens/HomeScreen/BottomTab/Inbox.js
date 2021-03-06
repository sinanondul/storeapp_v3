import React from "react";
import {View, Platform, Header, Text, StyleSheet, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { openDrawer } from "../../../../App"

const InboxStack = createStackNavigator();

export default function Inbox({navigation}) {
  return (
    <InboxStack.Navigator>
      <InboxStack.Screen name="Inbox" component={InboxScreen} options={InboxScreen.navigationOptions}/>
    </InboxStack.Navigator>
  );
}

class InboxScreen extends React.Component{

  render(){
    return (
      <View 
      style={styles.container}>
          <Text>Inbox</Text>
      </View>
    )
  }

  static navigationOptions = {
    title: 'Inbox',
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
