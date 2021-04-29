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
import Swipeout from 'react-native-swipeout';

import firebase from "firebase";
import Fire from "../../firebase/Fire";

import { openDrawer } from "../../../App";
import BottomRightButton from "../../components/BottomRightButton";
import DefaultFooter from "../../components/DefaultFooter";

import CourseItem from "./components/CourseItem";
import styles from "./styles";

export default class LandingScreen extends React.Component {
  state = {
    courses: [],
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({ item }) => {
    return (
      <Swipeout right={this.swipeButtons(item)} autoClose='true' backgroundColor= 'transparent'>
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("CourseItem", { course: item })
          }
        >
          <CourseItem {...this.props} courseInfo={item} />
        </TouchableOpacity>
      </Swipeout>
    );
  };

  componentDidMount() {
    this.setState({courses: this.props.courses});
    this._unsubscribeFocus = this.props.navigation.addListener("focus", () => {
      this.setState({courses: this.props.courses});
    });
  }

  componentWillUnmount() {}

  swipeButtons(course) {return [{
    text: 'Remove',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {this.removeCourse(course)},
  }];}

  removeCourse(course) {
    const userRef = firebase.firestore().collection('users').doc(this.props.userData.uid);
    const courseRef = userRef.collection('courses').doc(course.id);
    const sectionHeaderRef = firebase.firestore().collection('sections').doc(Object.keys(course.sections)[0]);
    sectionHeaderRef.get().then(courseHeaderDoc => {
      let courseHeader = courseHeaderDoc.data();
      courseHeader.participantIds[this.props.userData.uid] = false;

      sectionHeaderRef.set({participantIds: courseHeader.participantIds}, {merge: true});
    })
    Fire.shared.deleteCollection(courseRef, 'messages');
    courseRef.delete();
    this.handleDelete(course.id);
  }

  handleDelete(courseId) {
    let coursesArray = this.state.courses;
    const index = coursesArray.findIndex(
      (item) => item.id === courseId
    );
    coursesArray.splice(index, 1);
    this.setState({courses: coursesArray});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <FlatList
            data={this.state.courses.sort((a, b) =>
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
            fontSize: 15,
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
