import { HeaderBackButton } from "@react-navigation/stack";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageBackground,
  Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SponsoredItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <ImageBackground
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 0.3,
            borderWidth: 5,
            marginTop: "30%",
            marginHorizontal: "5%",
            opacity: 0.8,
            backgroundColor: "white",
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity style={{ borderWidth: 3, borderRadius: 20 }}>
            <Text style={{ margin: 10 }}>{item.extra}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SponsoredItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    //justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    justifyContent: "center",
    alignItems: "center",
    //marginTop: "8%",
    fontSize: 28,
    marginBottom: 10,
    color: "#2890cf",
    textAlign: "center",
    opacity: 1,
  },
  description: {
    fontWeight: "600",
    paddingHorizontal: 64,
    marginBottom: 10,
    color: "#62656b",
    textAlign: "center",
  },
});
