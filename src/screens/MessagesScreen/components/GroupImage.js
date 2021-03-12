import React from 'react';
import {View, Text, Platform, TouchableOpacity, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles, {GroupImageStyles as pageStyles} from "./styles";


export default class GroupImage extends React.Component{

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }

  render(){
    return (
        <View style={pageStyles.defaultBackground}>
            <View style={pageStyles.defaultIconContainer}>
                <Icon
                    name='people'
                    size={128}
                    color='#fff'
                />
            </View>
            <View style={pageStyles.textContainer}>
                <Text style={pageStyles.groupTitle}>
                    {this.props.groupChatInfo.name}
                </Text>
            </View>
        </View>
    );
  }
}