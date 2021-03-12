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
          <View style={{
                height: this.props.height,
                width: this.props.height * 3,
                flexBasis: this.props.height * 3,
                flexDirection: 'row',
                backgroundColor: this.props.color,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                marginRight: 10,
            }}
          >
          
            <Text style={{
              color: '#fff',
              fontSize: 17,
              fontWeight: 'bold',
            }}
            >
              {this.props.text}
            </Text>
          </View>
    );
  }
}