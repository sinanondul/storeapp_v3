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
  state={
    openMessages: false,
    openAdd: false,
    openNotifications: false,
  }

  constructor(props) {
    super(props)

    this.toggleMessagesModal = this.toggleMessagesModal.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleNotificationsModal = this.toggleNotificationsModal.bind(this)
  }

  toggleMessagesModal() {
    if (!this.state.openMessages) {
      this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName: 'Messages' });
    }
    else {
      this.navigator && this.navigator.dispatch({ type: 'goBack', routeName: 'Messages' });
    }
    this.setState({
      openMessages: !this.state.openMessages
    })
  }

  toggleAddModal() {
    if (!this.state.openAdd) {
      Alert.alert("", this.state.openAdd.toString());
      this.navigator && this.navigator.dispatch(
        CommonActions.navigate({
        name: 'Add',
        })
      );
    }
    else {
      this.navigator && this.navigator.dispatch({ type: 'goBack' });
    }
    this.setState({
      openAdd: !this.state.openAdd
    })
  }

  toggleNotificationsModal() {
    this.setState({
      openNotifications: !this.state.openNotifications
    })
  }

  openMessages = () => {
    // call navigate for AppNavigator here:
    this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName: 'Messages' });
  }
  
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    // Alert.alert("", this.state.openMessages.toString())
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <SocialNavigator {...this.props} ref={nav => { this.navigator = nav; }}/>
        </View>
      </View>
    );
  }
}
