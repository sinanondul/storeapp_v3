import React from "react";
import {View, Platform, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { openDrawer } from "../../../App"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // textAlign: "center",
    },
  });
  
  class SuppliesScreen extends React.Component{

    render(){
      return (
        <View 
        style={styles.container}>
            <Text>Supplies page.</Text>
        </View>
      )
    }
  
    static navigationOptions = {
      title: <Text>Supplies</Text>,
      headerStyle: {
        backgroundColor: '#2890cf',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        flex: 0.6,
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
      headerRight: () => (
        <Icon
          name = {"plus"}
          style={{marginRight:10}}
          size={40}
          color='#fff'
          onPress={() => navigation.navigate("Add")}
        />
      ),
    };
  }

export default SuppliesScreen;
