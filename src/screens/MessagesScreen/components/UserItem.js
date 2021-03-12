import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {Avatar, Badge, withBadge} from "react-native-paper";
import firebase from 'firebase';
import moment from 'moment';

import {getFullName, getAvatar} from "../../../functions/UserInfoFormatter";
import Fire from "../../../firebase/Fire";
import styles from "../styles";


export default class UserItem extends React.Component{

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }

  render(){
      return (
          <View style={styles.messageItem}>
            <View style={styles.messageAvatar}>
              {getAvatar(this.props.userInfo, 47)}
            </View>
            <View style={styles.messageText}>
              <View style={styles.messageHeader}>
                <View style={styles.messageTitle}>
                  <Text style={styles.titleText} numberOfLines={1}>{getFullName(this.props.userInfo)}</Text>
                </View>
              </View>
            </View>
          </View>
      );
  }
}