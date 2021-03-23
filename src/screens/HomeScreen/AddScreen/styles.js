import { Dimensions, StyleSheet } from "react-native";

const AddStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },

  headerTitleStyle: {
    flex: 0.6,
    paddingRight: 60,
    alignSelf: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  bottom: {
    alignSelf: "flex-end",
    flexDirection: "row",
    paddingRight: 10,
    justifyContent: "flex-end",
    paddingVertical: 12,
  },

  inputContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    flexDirection: "row",
    height: Dimensions.get("window").height - 350,
    minHeight: 50,
  },
  postPhoto: {
    flex: 0.5,
    width: "100%",
    height: "100%",
  },

  photo: {
    //padding: 20,
  },
  textStyle: {
    flex: 0.3,
    width: Dimensions.get("window").width - 80,
    height: Dimensions.get("window").height - 400,
  },
  wholePost: {
    flex: 1,
    marginTop: 5,
    marginLeft: 10,
    // width: Dimensions.get("window").width - 80,
    // height: Dimensions.get("window").height - 400,
  },
  post: {
    color: "#FF6433",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
    marginRight: 20,
  },
  postButton: {
    //backgroundColor: "#FF6433",
    borderRadius: 10,
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  camera: {
    backgroundColor: "#FF6433",
    backgroundColor: "blue",

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  close: {
    backgroundColor: "#FF6433",
    shadowColor: "#000",
    width: 30,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
});

export default AddStyles;
