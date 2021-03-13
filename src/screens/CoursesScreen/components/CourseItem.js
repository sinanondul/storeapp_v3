import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";

import CourseTag from './CourseTag';
import styles from './styles';


export default class CourseItem extends React.Component{

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }

  render(){
    const courseInfo = this.props.courseInfo;
    const courseColor = courseInfo.color;
    return (
        <View style={styles.listItem}>
          <CourseTag height={26} color={courseColor} text={courseInfo.code}/>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={2}>
              {courseInfo.name}
            </Text>
          </View>
        </View>
    );
  }
}