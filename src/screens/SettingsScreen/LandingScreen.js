import React from "react";
import {View, Platform, Text} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { openDrawer } from "../../../App";
import styles from "./styles";
  
export default class LandingScreen extends React.Component{
    
    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
    }

    componentDidMount() {

    }
    
    render(){
      
      return (
        
        <View 
        style={styles.container}>
            <Text>Settings page.</Text>
        </View>
      );
    }
  
    static navigationOptions = {
      title: <Text>Settings</Text>,
      headerStyle: {
        backgroundColor: '#2890cf',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        flex: 0.6,
        paddingRight: 60,
        alignSelf: 'center', 
        alignItems: 'center',
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <Icon 
            name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
            style={{marginLeft:10}}
            size={40}
            color='#fff'
            onPress={() => openDrawer()}
            // onPress={() => Alert.alert('Hello world!')}
        />
      ),
    };
  }
