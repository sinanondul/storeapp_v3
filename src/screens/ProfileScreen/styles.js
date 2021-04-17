import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fbff",
    //paddingStart: 12,
  },

  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },
  headerText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 5,
  },

  profileTop: {
    //borderBottomWidth: 2,
  },
  containerHeader: {
    borderBottomColor: "black",
    height: 80,
    width: "100%",
  },
  text: {
    //fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 10,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImageContainer: {
    //alignSelf: "center",
    flexDirection: "row",
    flex: 1,
    paddingLeft: 12,
  },
  profileImage: {
    marginTop: 60,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "orange",
    //width: "23.5%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 70,
    flex: 1,
    paddingRight: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  dm: {
    backgroundColor: "#41444B",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 5,
  },
  infoContainer: {
    marginTop: 16,
    flexDirection: "column",
    paddingLeft: 12,
  },
  statsContainer: {
    flexDirection: "column",
    alignSelf: "center",
    marginTop: 32,
    paddingLeft: 12,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    marginRight: 20,
  },
  userInfoSection: {
    paddingHorizontal: 0,
    marginBottom: 3,
    flexDirection: "row",
    marginTop: 15,
    paddingStart: 12,
  },
  userInfoSectionLower: {
    paddingHorizontal: 2,
    marginBottom: 0,
    flexDirection: "row",

    marginTop: 0,
    paddingStart: 12,
  },
  infoBoxWrapper: {
    borderTopColor: "#dddddd",
    flexDirection: "row",
    width: "100%",
    paddingStart: 12,
  },
  infoBox: {
    marginRight: 30,
  },

  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  myposts: {
    marginTop: 0,
  },
  MyPostFeedItem: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 0,
    flexDirection: "column",
    marginVertical: 0,

    width: "100%",
    borderColor: "gray",
    marginVertical: 1,
    minHeight: 100,
  },
  feedHeader: {
    flex: 1,
    flexDirection: "row",
    height: 69,
  },
  userAvatar: {
    paddingTop: 9,
    flexDirection: "row",
    paddingLeft: 12,
    width: 80,
    height: 80,
  },
  userText: {
    flex: 0.2,
    height: 25,
    paddingTop: 9,
    flexDirection: "row",
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
    paddingTop: 1,
    flex: 0.5,
    flexDirection: "column",
    fontWeight: "100",
  },
  loneText: {
    paddingLeft: 0,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#454D65",

    paddingBottom: 15,
    flexDirection: "row",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 2,

    flexDirection: "row",
  },
  post: {
    fontSize: 14,
    marginRight: 9,
    width: 260,
    height: 70,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,

    marginVertical: 20,
    alignSelf: "center",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default styles;
