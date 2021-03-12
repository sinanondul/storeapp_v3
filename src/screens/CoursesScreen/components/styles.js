import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginRight: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold'
    }
});

export default styles;
