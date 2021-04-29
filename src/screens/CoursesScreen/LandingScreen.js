import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import firebase from "firebase";

import { openDrawer } from "../../../App";
import BottomRightButton from "../../components/BottomRightButton";
import DefaultFooter from "../../components/DefaultFooter";

import CourseItem from "./components/CourseItem";
import styles from "./styles";

const courseItems = [
  {
    id: 1,
    code: "GE 402",
    color: "#00b300",
    name: "Innovative Design and Entrepreneurship II",
    description: null,
    sectionChats: [],
    groupChats: [],
  },
];

export default class LandingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          this.props.navigation.navigate("CourseItem", { course: item })
        }
      >
        <CourseItem {...this.props} courseInfo={item} />
      </TouchableOpacity>
    );
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <FlatList
            data={this.props.courses.sort((a, b) =>
              a.code > b.code ? 1 : b.code > a.code ? -1 : 0
            )}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
          />
          <BottomRightButton
            {...this.props}
            name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
            onPress={() => {
              this.props.navigation.navigate("Add");
            }}
          />
        </View>
      </View>
    );
  }

  static navigationOptions = {
    title: (
      <View
        style={{
          flexDirection: "row",
          paddingTop: 5,
          alignItems: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ height: 20, width: 30 }}
          source={require("../../../assets/splash.png")}
        />
        <Text
          style={{
            alignSelf: "center",
            alignItems: "center",
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            paddingLeft: 3,
          }}
        >
          Courses
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: 60,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
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
  };
}
