import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import OnboardingSlides from "../OnboardingSlides";

export default Onboarding = () => {
  return (
    <View style={styles.container}>
      <FlatList data={OnboardingSlides} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
