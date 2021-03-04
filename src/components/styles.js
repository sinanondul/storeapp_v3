import { StyleSheet } from "react-native";

const ComponentStyles = StyleSheet.create({
    container: {
      flex: 1,
    },

    footerContainer: {
      justifyContent: 'space-evenly',
      backgroundColor: '#fff'
    },

    footerButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      borderRadius: 24,
    },

    
    addButton: {
      width: 48,
      height: 48,
      borderRadius: 48 / 2,
      backgroundColor: '#f4511e',
      justifyContent: 'center',
      alignItems: 'center',
    },

    messagesButton: {

    },

    messagesBadge: {
      backgroundColor: "#f4511e",
      alignSelf: 'flex-end',
    },


    notificationsButton: {

    }
})

export default ComponentStyles;