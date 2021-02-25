import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./LandingScreen";
//import AddScreen from "./AddScreen";
import styles from "./styles";
import { Alert } from 'react-native';

export default class ProfileScreen extends React.Component{

  componentDidMount() {
  }

  componentWillUnmount() {
  }
    
  render(){
    const ProfileStack = createStackNavigator();
    return (
      <ProfileStack.Navigator
        initialRouteName='Landing'
      >
        <ProfileStack.Screen name="Landing" options={LandingScreen.navigationOptions}>
          {(props) => <LandingScreen {...props} userData={this.props.userData}/>}
        </ProfileStack.Screen>
      </ProfileStack.Navigator>
    );
  }
}
