import React from "react";
import { ImageBackground, View, Text } from "react-native";

function Ad(props) {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/hamburger.jpg")}
        resizeMode="stretch"
        style={{
          height: 70,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            opacity: 0.8,
            height: 30,
            width: "60%",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "blue" }}>Siel Roja Hamburgers</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Ad;
