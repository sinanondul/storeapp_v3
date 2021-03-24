import React from "react";
import {
    View,
    Image,
    Platform,
    Text,
    Alert,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles"


export default class InteractiveBar extends React.Component
{
    state = {
        uped: false,
    }

    toggleUped = () => {
        this.setState({uped: !this.state.uped});
    }

    render() {
        return(
            <View style={styles.interactiveBar}>
                <TouchableOpacity style={styles.button} onPress={this.toggleUped}>
                    {   this.state.uped 
                        ?   <Image
                                source={require('../assets/Post_UP_Icon_Filled.png')}
                                style = {{width: 28, height: 28, borderRadius: 14}}
                                resizeMode = "stretch"
                            />
                        :   <Image
                                source={require('../assets/Post_UP_Icon_Outline.png')}
                                style = {{width: 28, height: 28, borderRadius: 14}}
                                resizeMode = "stretch"
                            />
                    }
                    
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button} >
                    <Ionicons
                        style={styles.intButtons}
                        name="chatbubble-outline"
                        size={30}
                        color="#73788"
                    />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} >
                    <Ionicons
                        style={styles.intButtons}
                        name="send-outline"
                        size={30}
                        color="#73788"
                    />
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Ionicons
                        style={styles.intButtons}
                        name="bookmark-outline"
                        size={30}
                        color="#73788"
                    />
                </TouchableOpacity>
            </View>
              
        );
    }
}
    
