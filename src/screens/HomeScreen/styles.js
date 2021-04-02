import { StyleSheet } from "react-native";

const LandingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fbff",
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutbutton: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "red",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },

  feed: {
    //marginHorizontal: 5,
  },

  feedItem: {
    backgroundColor: "#FFF",
    //borderRadius: 5,
    marginVertical: 5,
    flexDirection: "column",
    elevation: 5,
  },
  feedHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    //paddingRight: 10,
  },
  userInfo: {
    height: 20,
    paddingLeft: 10,
    flex: 1,
    borderWidth: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    //paddingTop: 20,
    //flexDirection: "row",
    //paddingLeft: 12,
    //marginRight: 5,
    width: 50,
    height: 50,
  },
  userText: {
    flexDirection: "row",
    flex: 0.5,
    height: 20,
    paddingLeft: 10,
    //justifyContet: "center",
  },
  moreButton: {
    height: 80,
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 40,
  },

  feedContent: {
    flexDirection: "column",
    paddingRight: 12,
    paddingLeft: 10,
  },

  mainText: {
    marginTop: 10,
    marginBottom: 10,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#454D65",
  },
  handle: {
    paddingLeft: 4,
    paddingTop: 1,
    fontSize: 12,
    fontWeight: "normal",
    color: "#666666",
  },
  timestamp: {
    fontSize: 11,
    color: "#999999",
    marginTop: 2,
  },
  seperatorDot: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 4,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 2,
    color: "#999999",
  },
  post: {
    //marginTop: 16,
    fontSize: 14,
  },
  postImage: {
    width: "100%",
    height: 200,
    flexGrow: 2,
    marginVertical: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  interactiveBar: {
    height: 30,
    width: "100%",
    //alignItems: "center",
    //justifyContent: "center",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  intButtons: {
    flexDirection: "row",
    marginLeft: 53,
  },
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    shadowColor: "black",
  },
  //tabs
});

const MainStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LandingStyles;
export { MainStyles };
