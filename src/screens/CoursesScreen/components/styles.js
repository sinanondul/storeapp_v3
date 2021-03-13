import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        height: 80,
        overflow:'hidden',
    },
    listItem: {
        height: 80,
        backgroundColor: '#fff',
        flexDirection: "row",
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        borderBottomColor:'#f4f4f4',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: 50,
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    sectionItem: {
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderBottomColor:'#f4f4f4',
        borderBottomWidth: 1,
    },
    sectionItemText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 40,
    }
});

export default styles;
