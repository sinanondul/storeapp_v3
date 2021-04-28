import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  feed: {
    //marginVertical: 10,
  },

  interactiveBar: {
    height: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    marginRight: "25%",
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  upedText: {
    position: "absolute",
    right: -20,
    color: "#f4511e",
    fontSize: 20,
  },
  regularText: {
    position: "absolute",
    left: 30,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
    //marginTop: 22,
  },
  modalView: {
    height: "80%",
    width: "80%",
    //margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#f0fbff",
  },
  button2: {
    width: "100%",
    height: "5%",
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
    paddingTop: 0,
    paddingBottom: 0,
  },
  textInputStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 15,
    height: 40,
    width: "80%",
    textAlignVertical: "top",
    padding: 10,
    paddingTop: 9,
    paddingBottom: 0,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  feedHeader: {
    //flexDirection: "row",
    width: "90%",
  },
  userText: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    height: 20,
  },
});

export default styles;
