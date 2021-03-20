import { Dimensions, StyleSheet } from "react-native";

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

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#FF6433",
  },

  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    //backgroundColor: "red",
    padding: 10,
  },

  photo: {
    alignItems: "flex-end",
    padding: 15,
  },
  textStyle: {
    //width: 300,
    marginTop: 10,
    width: Dimensions.get("window").width - 50,
  },
  post: {
    color: "#FF6433",
    padding: 15,
    opacity: 0.8,
    borderRadius: 5,
    fontSize: 20,
  },
  shadow: {
    shadowColor: "#FF6E33",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});

export default AddStyles;
