import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "white",
    flex: 1,
    //borderTopWidth: 1,
    minHeight: 70,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    //borderTopWidth: 1,
  },
  rowView: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "nowrap",
  },
  avatarColumn: {
    flex: 0.15,
    padding: 12,
  },
  textColumn: {
    paddingTop: 12,
    paddingLeft: 10,
    flexDirection: "column",
    flex: 0.6,
    marginBottom: 12,
  },
  buttonView: {
    flex: 0.35,
    alignItems: "center",
    paddingTop: 12,
    //borderWidth: 2,
  },
  name: {
    fontWeight: "600",
  },
  handle: {
    fontWeight: "100",
    color: "gray",
  },
});

export default styles;
