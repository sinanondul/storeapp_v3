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
        marginRight: 20,
        color: "#f4511e",
        fontSize: 15,
    }
})

const GroupImageStyles = StyleSheet.create({
    defaultBackground: {
        flex: 1,
        backgroundColor: "#f4511e",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    defaultIconContainer: {
        height: 180,
        flexBasis: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: '100%',
        height: 60,
        flexBasis: 60,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    groupTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    }
})


const ParticipantItemDialogStyles = StyleSheet.create({
    container: {
    },
    row: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#f4f4f4',
        justifyContent: 'center',
        paddingLeft: 10
    },
    text: {
        fontSize: 17,
    },
    redText: {
        color: '#D00000',
        fontSize: 17,
    }
})

export default componentStyles;
export { GroupChatItemStyles, ParticipantListItemStyles, GroupImageStyles, ParticipantItemDialogStyles };