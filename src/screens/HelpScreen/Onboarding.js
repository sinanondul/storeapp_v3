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
import OnboardingSlides from "./OnboardingSlides";
import OnboardingItem from "./OnboardingItem";

const Onboarding = () => {
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
          data={OnboardingSlides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
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
        <View style={styles.text}>
          <View style={styles.dotContainer}>
            <Text>Expanding Dot</Text>
            <ExpandingDot
              data={OnboardingSlides}
              expandingDotWidth={30}
              scrollX={scrollX}
              inActiveDotColor={"#347af0"}
              activeDotColor={"#347af0"}
              inActiveDotOpacity={0.5}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 3,
              }}
              containerStyle={{
                top: 30,
              }}
            />
          </View>
          <View style={styles.dotContainer}>
            <Text>Scaling Dot</Text>
            <ScalingDot
              data={OnboardingSlides}
              scrollX={scrollX}
              containerStyle={{
                top: 30,
              }}
              inActiveDotColor={"#347af0"}
              activeDotColor={"#347af0"}
            />
          </View>

          <View style={styles.dotContainer}>
            <Text>Sliding Border</Text>
            <SlidingBorder
              containerStyle={{ top: 30 }}
              data={OnboardingSlides}
              scrollX={scrollX}
              dotSize={24}
              borderPadding={-5}
            />
            {/*<Pagination data={OnboardingSlides} scrollX={scrollX} />*/}
          </View>
          <View style={(styles.dotContainer, { marginBottom: 30 })}>
            <Text>Sliding Dot</Text>
            <SlidingDot
              marginHorizontal={3}
              containerStyle={{ top: 30 }}
              data={OnboardingSlides}
              scrollX={scrollX}
              dotSize={12}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
