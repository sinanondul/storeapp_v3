import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";

import HomeNavigator from "../../navigation/HomeNavigator";
import styles from "./styles";

export default class HomeScreen extends React.Component {
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      // do something
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {

    return (
      <HomeNavigator/>
    );
  }
}
