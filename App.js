import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import firebaseKeys from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import AppPage from "./src/navigation/PageNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { Alert, LogBox } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { render } from "react-dom";

import firebase from "firebase";
LogBox.ignoreAllLogs(true);

//firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  s;
}
const navigationRef = React.createRef();

export function openDrawer() {
  navigationRef.current &&
    navigationRef.current.dispatch(DrawerActions.toggleDrawer());
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoggedIn: false,
    userInfo: {
      uid: null,
      name: "Blank",
      surename: "Blankovich",
      avatar: null,
      email: null,
    },
    chats: [],
  };

  componentDidMount() {
    //Auth load
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            var userData = firestoreDocument.data();
            this.setState({
              userInfo: {
                uid: userData.id,
                name: userData.name,
                surename: userData.surename,
                avatar: userData.avatar,
                email: userData.email,
              },
            });
            this.setState({ isLoggedIn: true });
          });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
    const userData = this.state.userInfo;
    const chats = this.state.chats;
    return (
      <NavigationContainer ref={navigationRef}>
        {this.state.isLoggedIn ? (
          <AppPage userData={userData} chats={chats} />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    );
  }
}
