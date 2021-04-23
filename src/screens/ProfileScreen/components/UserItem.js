import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {Avatar, Badge, withBadge} from "react-native-paper";
import firebase from 'firebase';
import moment from 'moment';

import {getFullName, getAvatar} from "../../../functions/UserInfoFormatter";
import Fire from "../../../firebase/Fire";
import styles from "../../MessagesScreen/styles";


export default class UserItem extends React.Component{

  constructor(props) {
    super(props)

  }

  state={
    userInfo: null,
  }

  componentDidMount() {
    Alert.alert('mounting');
    const userRef = firebase.firestore().collection('users').doc(this.props.uid);
    Alert.alert(this.props.uid);
    userRef.get().then(userDoc => {
      const userInfo = userDoc.data();
      this.setState({userInfo: userInfo})
    })
    .catch(error => {Alert.alert(error.toString())});
  }

  render(){
      return (
          <View style={styles.messageItem}>
            <View style={styles.messageAvatar}>
              {this.state.userInfo ? getAvatar(this.state.userInfo, 47) : null}
            </View>
            <View style={styles.messageText}>
              <View style={styles.messageHeader}>
                <View style={styles.messageTitle}>
                  <Text style={styles.titleText} numberOfLines={1}>
                    {this.state.userInfo ? getFullName(this.state.userInfo) : null}
                  </Text>
                </View>
              </View>
            </View>
          </View>
      );
  }
}