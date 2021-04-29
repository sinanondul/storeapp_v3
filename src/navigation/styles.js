import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    flex: 0.4,
    backgroundColor: "#5DADE2",
  },
  userInfoWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
  },
  userAvatar: {
    height: 80,
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  userTextWrapper: {
    flex: 0.7,
    paddingTop: 22.5,
    flexDirection: "column",
  },
  userName: {
    paddingLeft: 3,
    flex: 0.5,
  },
  userNameText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
  handleText: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#fff",
  },

  topDrawerSection: {
    flex: 1,
  },
  bottomDrawerSection: {
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  drawerSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerItem: {
    //marginTop: 5,
    fontWeight: "bold",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default styles;
