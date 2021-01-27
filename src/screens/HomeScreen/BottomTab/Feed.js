import React from "react";
import {View, Platform, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { openDrawer } from "../../../../App"

const FeedStack = createStackNavigator();

export default function Feed({navigation}) {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={FeedScreen} options={FeedScreen.navigationOptions}/>
    </FeedStack.Navigator>
  );
};

class FeedScreen extends React.Component{

  render(){
    return (
      <View 
      style={styles.container}>
          <Text>Feed</Text>
      </View>
    )
  }

  static navigationOptions = {
    title: <Text>Feed</Text>,
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
