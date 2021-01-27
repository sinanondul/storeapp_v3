import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {useFocusEffect} from '@react-navigation/native';

import LandingScreen from "./LandingScreen";
import AddScreen from "./AddScreen";
import styles from "./styles";
import { Alert } from 'react-native';

export default class HousematesScreen extends React.Component{
  
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render(){
    const HousematesStack = createStackNavigator();

    return (
      <HousematesStack.Navigator 
        initialRouteName='Landing'
      >
        <HousematesStack.Screen name="Landing" component={LandingScreen} options={LandingScreen.navigationOptions}/>
        <HousematesStack.Screen name="Add" component={AddScreen}/>
      </HousematesStack.Navigator>
    );
  }
}