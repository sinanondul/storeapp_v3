import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";

import CourseTag from './CourseTag';
import styles from './styles';


export default class UserItem extends React.Component{

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }

  render(){
    const courseInfo = this.props.courseInfo;
    const courseColor = courseInfo.color;
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate('CourseItem', {courseInfo: courseInfo})}>
          <CourseTag height={30} color={courseColor} text={courseInfo.code}/>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1}>
              {courseInfo.name}
            </Text>
          </View>
        </TouchableOpacity>
    );
  }
}