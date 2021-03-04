import React from "react";
import {View} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

import styles from "./styles";

const LandingStack = createStackNavigator();

export default class HomeScreen extends React.Component {
  state={
    openMessages: false,
    openAdd: false,
    openNotifications: false,
  }
  
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <DefaultHeader {...this.props} mainScreen={true} title={'Social'}/>
        <LandingScreen {...this.props}/>
        {this.state.openMessages
          ? <MessagesModal {...this.props} openMessages={this.state.openMessages}/>
          : null
        }
        <DefaultFooter {...this.props}/>
      </View>
    );
  }
}
