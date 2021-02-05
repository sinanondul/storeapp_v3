import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SuppliesNavigator from "../../navigation/SuppliesNavigator";
import LandingScreen from "./LandingScreen";
import AddScreen from "./AddScreen";
import styles from "./styles";
import { Alert } from 'react-native';

export default class SuppliesScreen extends React.Component{

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
    
    render(){
      return (
       <SuppliesNavigator/>
      );
    }
  }
