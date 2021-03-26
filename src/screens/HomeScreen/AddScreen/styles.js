import { Dimensions, StyleSheet } from "react-native";

const AddStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  talkBubble: {
    backgroundColor: "transparent",
  },
  talkBubbleSquare: {
    width: 240,
    marginLeft: 30,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
  },
  talkBubbleTriangle: {
    position: "absolute",
    left: -26,
    top: 8,
    width: 0,
    height: 0,
    marginLeft: 30,
    borderTopColor: "transparent",
    borderTopWidth: 13,
    borderRightWidth: 26,
    borderRightColor: "white",
    borderBottomWidth: 13,
    borderBottomColor: "transparent",
  },

  textWrapper: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
  },
  textStyle: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    textAlignVertical: "top",
  },

  postPhoto: {
    height: 200,
    justifyContent: "center",
    padding: 10,
  },

  postButton: {
    flexBasis: 30,
    width: 60,
    height: 30,
    borderRadius: 18,
    backgroundColor: "#f4511e",
    marginRight: 10,
    marginLeft: "auto",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  postButtonText: {
    color: "white",
  },

  bottomBar: {
    width: "100%",
    alignSelf: "flex-end",
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottomButton: {
    padding: 10,
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
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    flexDirection: "row",
    minHeight: 50,
  },

  photo: {
    //padding: 20,
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
