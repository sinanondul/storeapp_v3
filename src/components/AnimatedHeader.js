import React from "react";
import { Animated, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 200;

const AnimatedHeader = ({ animatedValue }) => {
  const insets = useSafeAreaInsets();

  const headerHeight = animValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: "clamp",
  });
  return null;
};
