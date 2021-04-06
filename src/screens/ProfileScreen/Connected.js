import React from "react";
import { Text, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FollowItem from "./components/FollowItem";
import FollowersList from "./components/FollowersList";
import FollowingList from "./components/FollowersList";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
export default class Connected extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({ item }) => {
    return (
      <FollowItem
        {...this.props}
        post={item}
        //profileRoute={"ProfileFromHome"}
      />
    );
  };

  render() {
    return (
      <View
        style={{
          marginTop: 10,
          height: Dimensions.get("window").height - 56,
          flex: 1,
        }}
      >
        <Tab.Navigator
          headerMode={false}
          initialRouteName="Followers"
          tabBarOptions={{
            labelStyle: {
              fontSize: 11,
            },
          }}
          lazy={false}
          style={{ flex: 1 }}
        >
          <Tab.Screen name="Followers">
            {(props) => <FollowersList {...props} {...this.props} />}
          </Tab.Screen>

          <Tab.Screen name="Following">
            {(props) => <FollowingList {...props} {...this.props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    );
  }

  static navigationOptions = {
    title: <Text style={{ alignItems: "center" }}>{}</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#ffff",
    headerTitleStyle: {
      flex: 0.6,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
      alignItems: "center",
      justifyContent: "center",
    },
    headerLeft: () => (
      <Icon
        name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
        style={{ marginLeft: 10 }}
        size={40}
        color="#ffff"
        onPress={() => openDrawer()}
      />
    ),
    headerRight: () => (
      <Icon
        name={
          Platform.OS === "ios" ? "ios-filter-outline" : "md-filter-outline"
        }
        style={{ marginRight: 12 }}
        size={30}
        color="#fff"
        //onPress={() => this.props.navigation.navigate("EditProfile")}
      />
    ),
  };
}
