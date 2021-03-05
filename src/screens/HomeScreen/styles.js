import { StyleSheet } from "react-native";

const LandingStyles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: 16,
  },

  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  feedHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    height: 80,
    flex: 0.2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 5,
    paddingTop: 20,
  },
  userText: {
    flex: 0.7,
  },
  moreButton: {
    height: 80,
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 40,
  },

  mainText: {
    paddingLeft: 10,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
  },
  postImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
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
  iconsBar: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  row: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  //tabs
});

export default LandingStyles;
