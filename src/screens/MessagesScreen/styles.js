import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    messageItem: {
        height: 80,
        backgroundColor: "#FFF",
        flexDirection: "row",
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        borderBottomColor:'#f4f4f4',
        borderBottomWidth: 1,
    },
    messageAvatar: {
        height: 80,
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
    },
    messageText: {
        flex: 0.8,
        flexDirection: 'column',
        paddingTop: 15,
        paddingBottom: 15,
    },
    messageHeader: {
        flex: 0.5,
        flexDirection: "row",
    },
    messageTitle: {
        flex: 0.7
    },
    titleText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    messageTimeStamp:{
        flex: 0.3,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    },
    timeStampText: {
        color: '#797D7F'
    },
    messageSummary:{
        flex: 0.5,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    summaryText: {
        flex: 0.9,
        justifyContent: 'center',
        paddingTop: 5,
    },
    lastMessageText: {
        color: '#797D7F'
    },
    newBadge: {
        flex: 0.1,
        justifyContent: 'center',
        paddingTop: 5,
        paddingRight: 20,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerAvatar: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },
    headerText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 5,
    }
});

const CustomizeGroupChatScreenStyles = StyleSheet.create({
    groupInfoContainer: {
        flexBasis: 140,
        height: 140,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupInfoIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#f4511e",
    },
    groupInfoTextContainer: {
        flex: 0.8,
        flexDirection: 'column',
    },
    groupInfoText: {
        fontSize: 18,
        marginBottom: 4,
    },
    groupInfoUnderline: {
        backgroundColor: '#a9a9a9',
        height: 3,
    },
    participantsContainer: {
        flexBasis: 140,
        height: 140,
        backgroundColor: '#fff',
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    },
    participantsTitle: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
    }
});

const GroupChatDescriptionScreenStyles = StyleSheet.create({ 
    headerContainer: {
        backgroundColor: '#fff',
        height: 240,
        marginTop: 10,
    },


    participantListContainer: {
        backgroundColor: '#fff',
        marginTop: 10,
    },
    participantsTitle: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 16,
    },


    leaveGroupContainer: {
        backgroundColor: '#fff',
        height: 55,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leaveGroupIcon: {
        marginLeft: 20,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    leaveGroupText: {
        color: '#D00000',
        fontSize: 16,
        marginLeft: 10,
    }
});

export default styles;

export { CustomizeGroupChatScreenStyles, GroupChatDescriptionScreenStyles };