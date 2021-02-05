import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {useFocusEffect} from '@react-navigation/native';

import HousematesNavigator from "../../navigation/HousematesNavigator";
import styles from "./styles";

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

    return (
      <HousematesNavigator/>
    );
  }
}