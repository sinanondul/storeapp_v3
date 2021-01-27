import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    }, 
    userInfoSection: {
        flex: 0.35,
        paddingLeft: 20,
        backgroundColor: "#5DADE2",
    },
    topDrawerSection: {
        flex: 1,
    },
    bottomDrawerSection: {
        flex: 0.2,
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    drawerSection: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerItem: {
        marginTop: 5,
        fontWeight: 'bold'

    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

});

export default styles;