import React from 'react';
import {View, Platform} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class XButton extends React.Component {
    render() {
        return(
            <View style={{position: 'absolute', right: 0, top: 0}}>  

                <View 
                    style={{
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
                    onPress={this.props.onPress}
                />

            </View>
        );
    }
}