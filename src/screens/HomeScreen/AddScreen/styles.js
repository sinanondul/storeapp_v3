import { StyleSheet } from "react-native";

const AddStyles = StyleSheet.create({
    container: {
      flex: 1,
    },

    headerTitleStyle: {
      flex: 0.6,
      paddingRight: 60,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 32,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "black",
    },

    inputContainer: {
      margin: 32,
      flexDirection: "row",
    },
    
    photo: {
      alignItems: "flex-end",
      marginHorizontal: 32,
    },
  });

export default AddStyles;