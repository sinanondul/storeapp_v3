import React from 'react';
import {View, Text, Platform, TouchableOpacity, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles";


export default class AddGroupChatButton extends React.Component{

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }

  render(){
      return (
          <View style={styles.messageItem}>
            <View style={styles.messageAvatar}>
                <Icon
                    name={Platform.OS === "ios" ? "ios-people" : "md-people"}
                    size={40}
                    color="#f4511e"
                    style={{
                    }}
                />
            </View>
            <View style={styles.messageText}>
              <View style={styles.messageHeader}>
                <View style={styles.messageTitle}>
                  <Text style={styles.titleText}> New Group </Text>
                </View>
              </View>
            </View>
          </View>
      );
  }
}