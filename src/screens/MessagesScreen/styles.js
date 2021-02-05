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
        flex: 0.3
    },
    timeStampText: {
        color: '#797D7F'
    },
    messageSummary:{
        flex: 0.5,
        paddingRight: 30,
    },
    summaryText: {
        color: '#797D7F'
    }
});

export default styles;