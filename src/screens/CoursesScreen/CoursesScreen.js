import React from "react";
import {View, Platform, Header, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";


import LandingScreen from "./LandingScreen";
import CourseItemScreen from './CourseItemScreen';
import AddCourseScreen from './AddCourseScreen';
import styles from "./styles";


export default class CoursesScreen extends React.Component{


  componentDidMount() {
  }

  render(){
    const CoursesStack = createStackNavigator();
    const userData = this.props.userData;
    const chats = this.props.chats;
    const messageCount = this.props.messageCount;
    const courses = this.props.courses;
    return (
      <CoursesStack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <CoursesStack.Screen name="Landing" options={LandingScreen.navigationOptions}>
          {(props) => <LandingScreen {...props} userData={userData} chats={chats} messageCount={messageCount} courses={courses}/>}
        </CoursesStack.Screen>
        <CoursesStack.Screen name="Add" options={AddCourseScreen.navigationOptions}>
          {(props) => <AddCourseScreen {...props} userData={userData} chats={chats} messageCount={messageCount} courses={courses}/>}
        </CoursesStack.Screen>
        <CoursesStack.Screen name="CourseItem" options={CourseItemScreen.navigationOptions}>
          {(props) => <CourseItemScreen {...props} userData={userData} chats={chats} messageCount={messageCount} courses={courses}/>}
        </CoursesStack.Screen>
      </CoursesStack.Navigator>
    );
  }

  static navigationOptions = {
   headerShown: false,
  };
}

