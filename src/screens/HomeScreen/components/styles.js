import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  interactiveBar: {
    height: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  button: {
    marginRight: "20%",
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  upedText: {
    position: "absolute",
    right: -20,
    color: "#f4511e",
    fontSize: 24,
  },
  regularText: {
    position: "absolute",
    right: -20,
    color: "black",
    fontSize: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
