import React from "react";
import {View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // textAlign: "center",
    },
  });
  
class AddScreen extends React.Component{

    render(){
      return (
        <View 
        style={styles.container}>
            <Text>Add housemates here.</Text>
        </View>
      )
    }
  
    static navigationOptions = {
      title: <Text>Housemates</Text>,
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
  }
}

export default AddScreen;
