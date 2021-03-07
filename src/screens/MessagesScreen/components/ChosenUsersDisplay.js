import React from 'react';
import {View, Text, Platform, TouchableOpacity, FlatList, Alert} from "react-native";
import {Avatar, Badge, withBadge} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from 'firebase';
import moment from 'moment';

import {getName, getAvatar} from "../../../functions/UserInfoFormatter";
import Fire from "../../../firebase/Fire";
import styles from "./styles";


export default class ChosenUsersDisplay extends React.Component{

  constructor(props) {
    super(props)

  }
  
  renderItem = ({item}) => { 
      return (
        <View style={styles.userDisplayElement}>
            
            {getAvatar(item, 50)}
            <Text style={styles.userName}>{getName(item)}</Text>

            {/* X Icon */}
            <View style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 15,
                height: 15,
                borderRadius: 7.5,
                backgroundColor: '#fff',
                }}
            />
            <Icon
              name={Platform.OS === "ios" ? "ios-close-circle" : "md-close-circle"}
              size={22}
              style={{
                position: 'absolute',
                top: 3,
                right: 3,
              }}
              onPress={() => this.props.removeParticipant(item.uid)}
            />

        </View>
      );
  }

  componentDidMount() {
  }

  render(){
      return (
          <View style={styles.usersDisplayContainer}>
            {this.props.participants && this.props.participants.length > 0
                ?   <FlatList
                        data={this.props.participants}
                        renderItem={this.renderItem}
                        horizontal
                        keyExtractor={(item) => item.uid}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                    />
                :   null
            }
          </View>
      );
  }
}