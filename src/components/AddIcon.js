import React from 'react';
import { View, Platform } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Ionicons";

import styles from './styles';

//#f4511e

export default class AddIcon extends React.Component 
{
    render() 
    {
        return (
            <TouchableOpacity style={styles.footerButtonContainer} onPress={() => this.props.navigation.navigate('Add')}>
                <Icon
                    name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
                    size={50}
                    color="#f4511e"
                    style={{
                    }}
                />
            </TouchableOpacity>
        );
    }
}