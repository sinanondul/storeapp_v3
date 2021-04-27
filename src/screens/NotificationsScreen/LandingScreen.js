import React from "react";
import {
  View,
  Platform,
  Header,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";

import firebase from "firebase";
import { openDrawer } from "../../../App";
import NotificationItem from "./components/NotificationItem";
import PostSpecificScreen from "./PostSpecificScreen";

export default class LandingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({ item }) => {
    //<PostSpecificScreen {...this.props} notification={item} />;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Post"),
            (props) => (
              <PostSpecificScreen
                {...props}
                userData={userData}
                notification={item}
                //notifications={notifications}
              />
            );
        }}
      >
        <NotificationItem
          {...this.props}
          userData={this.props.userData}
          notification={item}
        />
      </TouchableOpacity>
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
