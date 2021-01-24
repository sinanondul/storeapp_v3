import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // textAlign: "center",
    },
  });

function HousematesScreen(props) {
  return (
    <TouchableOpacity style={styles.center}>
      <Text>This is the housemates screen</Text>
    </TouchableOpacity>
  );
}

export default HousematesScreen;
