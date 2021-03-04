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
    if (this.props.route.params)
    {
      if (this.props.route.params.userInfo)
      {
        const userInfo = this.props.route.params.userInfo;
        Alert.alert("", userInfo.uid);
      }
    }
    return (
      <ProfileStack.Navigator
        initialRouteName='Landing'
      >
        <ProfileStack.Screen name="Landing" options={LandingScreen.navigationOptions}>
          {(props) => <LandingScreen {...props} userData={this.props.userData} userInfo={this.props.userData}/>}
        </ProfileStack.Screen>
      </ProfileStack.Navigator>
    );
  }
}
