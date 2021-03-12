import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {Avatar, Badge, withBadge} from "react-native-paper";
import firebase from 'firebase';
import moment from 'moment';

import {getFullName, getAvatar} from "../../../functions/UserInfoFormatter";
import {ParticipantListItemStyles as pageStyles} from './styles';
import styles from "../styles";


export default class ParticipantListItem extends React.Component{

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }

  render(){
      return (
          <View style={pageStyles.participantListItem}>
            <View style={styles.messageAvatar}>
              {getAvatar(this.props.userInfo, 40)}
            </View>
            <View style={styles.messageText}>
                <Text style={pageStyles.nameText} numberOfLines={1}>{getFullName(this.props.userInfo)}</Text>
            </View>
            { this.props.isAdmin
              ? <Text style={pageStyles.adminText}>
                  Admin
                </Text>
              : null
            }
          </View>
      );
  }
}