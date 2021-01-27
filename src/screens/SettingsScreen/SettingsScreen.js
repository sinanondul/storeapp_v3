import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./LandingScreen";
import styles from "./styles";

export default class SettingsScreen extends React.Component{
  
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render(){
    const SettingsStack = createStackNavigator();

    return (
      <SettingsStack.Navigator 
        initialRouteName='Landing'
        lazy={false}
      >
        <SettingsStack.Screen name="Landing" component={LandingScreen} options={LandingScreen.navigationOptions}/>
      </SettingsStack.Navigator>
    );
  }
}