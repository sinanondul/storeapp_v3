import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    followingButton: {
        backgroundColor: "#f4551e",
        width: 90,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    notFollowingButton: {
        backgroundColor: "#41444B",
        width: 90,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    followingButtonText: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'white',
    }
});

export default styles;