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
    var userInfo = this.props.userData;
    if (this.props.route.params)
    {
      if (this.props.route.params.userInfo)
      {
        userInfo = this.props.route.params.userInfo;
      }
    }
    return (
      <ProfileStack.Navigator
        initialRouteName='Landing'
      >
        <ProfileStack.Screen name="Landing" options={LandingScreen.navigationOptions}>
          {() => <LandingScreen {...this.props} userData={this.props.userData} userInfo={userInfo}/>}
        </ProfileStack.Screen>
      </ProfileStack.Navigator>
    );
  }
}
