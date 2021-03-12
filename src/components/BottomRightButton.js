import React from 'react';
import {View, Platform, TouchableOpacity, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


export default class BottomRightButton extends React.Component{

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }

  render(){
    const touchableSize = 56;
      return (
        <TouchableOpacity
            style={{
              textAlign: "center",
              textJustify: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',  
              backgroundColor: '#f4511e',
              width: touchableSize,
              height: touchableSize,
              borderRadius: touchableSize / 2,                                        
              bottom: 20,                                                    
              right: 20,
              elevation: 5,
              }}
              onPress={this.props.onPress}
            >
            
            <View
              style={{
                backgroundColor: '#fff',
                position: 'absolute',
                width: 35,
                height: 35,
                borderRadius: 35 / 2,
              }}
            />
            <Icon 
              name={this.props.name}
              size={64} 
              color="#f4511e"
              style={{
                position: 'absolute',
                right: Platform.OS === "web" ? -6 : 2,
              }}
            />
        </TouchableOpacity>
      );
  }
}