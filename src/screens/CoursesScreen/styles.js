import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const CourseItemScreenStyles = StyleSheet.create({
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
    },

    groupInfoContainer: {
        height: 140,
        flexBasis: 140,
        backgroundColor: '#fff',
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
    }
})

export default styles;
export { CourseItemScreenStyles };
