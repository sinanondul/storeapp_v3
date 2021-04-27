import React from "react";
import {
  View,
  Platform,
  Header,
  Text,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";

import firebase from "firebase";
import { openDrawer } from "../../../App";
import NotificationItem from "./components/NotificationItem";

export default class LandingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({ item }) => {
    return (
      <View>
        <NotificationItem
          {...this.props}
          userData={this.props.userData}
          notification={item}
        />
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          style={styles.myposts}
          data={this.props.notifications}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id} //id}
          nestedScrollEnabled
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  }

  static navigationOptions = {
    title: "Notifications",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: 60,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  myposts: {
    //marginTop: 10,
  },
});
