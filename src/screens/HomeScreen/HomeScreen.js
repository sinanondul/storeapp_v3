import React from "react";
import {View, Text} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from '@react-navigation/native';

import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";

//Components
import DefaultHeader from '../../components/DefaultHeader'
import LandingScreen from "./LandingScreen";
import DefaultFooter from '../../components/DefaultFooter';

//Navigators
import SocialNavigator from "../../navigation/HomeNavigator";

//Screens
import MessagesModal from '../MessagesScreen/MessagesModal';
import MessagesScreen from '../MessagesScreen/MessagesScreen';

import styles from "./styles";
import AddScreen from "../HousematesScreen/AddScreen";

const LandingStack = createStackNavigator();

export default class HomeScreen extends React.Component {
  
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <SocialNavigator {...this.props}/>
        </View>
      </View>
    );
  }
}
