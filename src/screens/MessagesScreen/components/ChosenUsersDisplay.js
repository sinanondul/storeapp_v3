import React from 'react';
import {View, Text, Platform, TouchableOpacity, FlatList, Alert} from "react-native";
import {Avatar, Badge, withBadge} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import moment from 'moment';

import firebase from 'firebase';
import Fire from "../../../firebase/Fire";

import {getName, getAvatar} from "../../../functions/UserInfoFormatter";
import XButton from "../../../components/XButton";
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
            { this.props.participantsRemoveable
              ? <XButton onPress={() => this.props.removeParticipant(item.uid)}/>
              : null
            }
            

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