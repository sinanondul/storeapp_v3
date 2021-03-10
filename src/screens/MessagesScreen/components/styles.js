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
    },
})

const GroupChatItemStyles = StyleSheet.create({ 
    deleteButton: {
        flex: 1,
        backgroundColor: '#dd2c00',
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
    },
    deleteText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
})

const ParticipantListItemStyles = StyleSheet.create({ 
    participantListItem: {
        height: 80,
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: 'center',
    },
    avatar: {
    },
    nameText: {
        fontSize: 17,
    },
    adminText: {
        color: "#f4511e",
        fontSize: 14,
    }
})

export default componentStyles;
export { GroupChatItemStyles, ParticipantListItemStyles };