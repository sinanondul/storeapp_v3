import React from 'react';
import { View, Platform } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Badge} from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";

import styles from './styles';


export default class NotificationsIcon extends React.Component 
{
    render() 
    {
        return (
            <TouchableOpacity style={styles.footerButtonContainer}>
                
                
                <Icon
                    name={
                    Platform.OS === "ios"
                        ? "ios-notifications-outline"
                        : "md-notifications-outline"
                    }
                    size={30}
                    color='#000'
                    onPress={() => this.props.navigation.navigate('Notifications')}
                />
                <Badge
                    visible={this.props.notificationCount > 0}
                    size={20}
                    style={{ position: 'absolute', top: 1, right: 1, backgroundColor: "#f4511e" }}
                    >
                    {this.props.notificationCount}
                </Badge>
            </TouchableOpacity>
        );
    }
}