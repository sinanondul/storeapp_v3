import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    interactiveBar: {
        height: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
    },
    button: {
        marginRight: '20%'
    },
    buttonInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upedText: {
        position: 'absolute',
        right: - 20,
        color: "#f4511e",
        fontSize: 24,
    },
    regularText: {
        position: 'absolute',
        right: - 20,
        color: 'black',
        fontSize: 24,
    }
})

export default styles;