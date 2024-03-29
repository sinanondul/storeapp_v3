import React, { useCallback } from "react";
import {
  View,
  Platform,
  Header,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SectionsList from "./components/SectionsList";
import SectionMessagingInterface from './SectionMessagingInterface';
import CourseTag from './components/CourseTag';
import styles, { CourseItemScreenStyles as pageStyles } from "./styles";

const Tab = createMaterialTopTabNavigator();

export default class CourseItemScreen extends React.Component {
  state = {};

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
    const courseInfo = this.props.route.params.courseInfo;
    //Setting navigation options.
    this.props.navigation.setOptions({
      title: courseInfo.code,
      headerStyle: {
        backgroundColor: "#2890cf",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        flex: 0.6,
        paddingRight: Platform.OS === "ios" ? 0 : 60,
        alignSelf: "center",
        alignItems: "center",
        fontWeight: "bold",
      },
      // headerTitle: () => (
      //   <TouchableOpacity
      //     style={pageStyles.headerTitleContainer}
      //     onPress={() => {

      //     }}
      //   >

      //     <Text style={pageStyles.headerText}>
      //       { courseInfo.code }
      //     </Text>
      //   </TouchableOpacity>
      // ),
    });

    //Getting participant info.
  }

  componentWillUnmount() {}

  render() {
    const courseInfo = this.props.route.params.courseInfo;
    return (
      <View style={styles.container}>
        <View style={pageStyles.groupInfoContainer}>
          <CourseTag height={26} color={courseInfo.color} text={courseInfo.code}/>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={2}>
              {courseInfo.name}
            </Text>
          </View>
        </View>

        
        {/* <Tab.Navigator headerMode={false}>
          <Tab.Screen name="Sections">
            {(props) => null}
          </Tab.Screen>
          <Tab.Screen name="Groups">{(props) => null}</Tab.Screen>
        </Tab.Navigator> */}
      </View>
    );
  }

  static navigationOptions = {
    title: "Test",
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: Platform.OS === "ios" ? 0 : 60,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
  };
}
