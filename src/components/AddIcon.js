import React from "react";
import { View, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./styles";

//#f4511e


export default class AddIcon extends React.Component 
{
    render()
    {
        var paddingLeft;
        var paddingBottom;
        if (Platform.OS === "web") {
            paddingLeft = -6;
            paddingBottom = 2;
        }
        else {
            paddingLeft = 2;
            paddingBottom = 0;
        }

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Add')}>
                <Icon
                    name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
                    size= {60}
                    color="#f4511e"
                    style={{
                        paddingLeft: paddingLeft,
                        paddingBottom: paddingBottom,
                    }}
                />
            </TouchableOpacity>
        );
    }
}