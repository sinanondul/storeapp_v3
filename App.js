import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import firebaseKeys from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import PageNavigator from "./src/navigation/PageNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { Alert } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { render } from "react-dom";

import * as firebase from "firebase";
var firebaseConfig = firebaseKeys;
//firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const navigationRef = React.createRef();

export function openDrawer() {
  navigationRef.current &&
    navigationRef.current.dispatch(DrawerActions.toggleDrawer());
}

export default class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        {this.state.isLoggedIn ? (
          <PageNavigator {...this.props} />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    );
  }
}
