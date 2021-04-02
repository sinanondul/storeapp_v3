import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Animated,
} from "react-native";
import {
  ScalingDot,
  SlidingBorder,
  ExpandingDot,
  SlidingDot,
} from "react-native-animated-pagination-dots";
import SponsoredSlides from "./SponsoredSlides";
import SponsoredItem from "./SponsoredItem";

const Sponsored = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={SponsoredSlides}
          renderItem={({ item }) => <SponsoredItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />

        <SlidingDot
          marginHorizontal={3}
          containerStyle={{ top: 30 }}
          data={SponsoredSlides}
          scrollX={scrollX}
          dotSize={12}
        />
      </View>
    </View>
  );
};

export default Sponsored;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
