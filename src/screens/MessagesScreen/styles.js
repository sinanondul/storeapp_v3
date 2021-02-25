import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    messageItem: {
        flex: 1,
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
        paddingRight: 10,
    },
    headerText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
        paddingLeft: 10,
    }
});

export default styles;