import React, { useState } from "react";
import { Alert } from "react-native";
import firebase from "firebase";
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications

function getUser() {
  return firebase.firestore("users").doc(firebase.auth().currentUser.uid).get();
}

const sendPushNotification = async (expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Hello",
    body: "World",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

const SendNotificationToAllUsers = async () => {
  const users = await firebase.firestore().collection("user").get();
  users.docs.map((user) => sendPushNotification(user.data().expoToken));
};

export { sendPushNotification, SendNotificationToAllUsers };
