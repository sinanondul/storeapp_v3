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
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => {}}>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1}>
              {this.props.chat.groupChatInfo.name}
            </Text>
          </View>
        </TouchableOpacity>
    );
  }
}