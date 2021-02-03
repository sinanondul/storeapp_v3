import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import firebaseKeys from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import PageNavigator from "./src/navigation/PageNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { Alert } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { render } from "react-dom";

import firebase from "firebase";

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
  constructor(props) {
    super(props)

  }

  state = {
    isLoggedIn: false,
    userInfo:{
      uid: null,
      name: "Blank",
      surename: "Blankovich",
      avatar: null,
      messages: null,
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            var userData = firestoreDocument.data();
            this.setState({ userInfo: {
              uid: userData.uid,
              name: userData.name,
              surename: userData.surename,
              avatar: userData.avatar,
              messages: userData.messages
            }})
          })
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
    var userData = this.state.userInfo;
    return (
      <NavigationContainer ref={navigationRef}>
        {this.state.isLoggedIn ? (<PageNavigator userData={userData}/>) : (<AuthNavigator/>)}
      </NavigationContainer>
    );
  }
}
