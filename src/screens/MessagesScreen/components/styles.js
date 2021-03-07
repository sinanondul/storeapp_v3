import {StyleSheet} from "react-native";

const componentStyles = StyleSheet.create({ 
    usersDisplayContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        height: 90,
        flexBasis: 90,
      },
    userDisplayElement: {
        height: 90,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    userName: {
        marginTop: 3,
    }
})

export default componentStyles;