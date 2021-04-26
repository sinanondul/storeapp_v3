import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "white",

    flex: 1,
    //borderTopWidth: 1,
    minHeight: 90,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    //borderTopWidth: 1,
  },
  outerNew: {
    backgroundColor: "rgb(210, 235, 250)",

    flex: 1,
    //borderTopWidth: 1,
    minHeight: 90,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    //borderTopWidth: 1,
  },
  outerOld: {
    backgroundColor: "white",

    flex: 1,
    //borderTopWidth: 1,
    minHeight: 90,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    //borderTopWidth: 1,
  },
  rowView: {
    flexDirection: "row",
    flex: 1,
    //flexWrap: "nowrap",
  },
  avatarColumn: {
    flex: 0.2,
    paddingTop: 7,
    paddingLeft: 10,
  },
  avatarColumn2: {
    //flex: 0.17,
    width: "15%",
    paddingTop: 7,
    paddingLeft: 10,
  },
  textColumn: {
    paddingTop: 12,
    paddingLeft: 10,
    flexDirection: "column",
    flex: 0.6,
    marginBottom: 12,
  },
  notificationTextColumn: {
    paddingTop: 12,
    paddingLeft: 10,
    flexDirection: "column",
    //width: "0%",
    flex: 0.8,
    marginBottom: 12,
    //borderWidth: 2,
  },
  notificationText: {
    flexDirection: "row",
  },
  buttonView: {
    flex: 0.35,
    alignItems: "center",
    paddingTop: 12,
    //borderWidth: 2,
  },
  rightView: {
    flex: 0.15,
    //alignItems: "center",
    paddingTop: 12,
    //borderWidth: 2,
  },
  time: {
    color: "gray",
    fontSize: 12,
  },

  name: {
    fontWeight: "600",
  },
  txt: {
    fontWeight: "300",
    color: "rgb(38, 38, 36)",
    marginTop: 5,
  },
  handle: {
    fontWeight: "200",
    color: "gray",
  },
});

export default styles;
