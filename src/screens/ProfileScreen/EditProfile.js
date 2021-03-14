import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackGround,
  TextInput,
  StyleSheet,
} from "react-native";

//import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class EditProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  render() {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  static navigationOptions = {
    title: <Text>Edit Profile</Text>,
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    // headerLeft: () => (
    //   /*WILL CHANGE TO GO BACK-- WILL ADD SUBMIT BUTTON ON HEADERRIGHT*/
    //   <Icon
    //     name={Platform.OS === "ios" ? "back-outline" : "md-back"}
    //     style={{ marginLeft: 10 }}
    //     backgroundColor="#1f65ff"
    //     size={40}
    //     color="#299303"
    //   />
    // ),
  };
}
