import React from "react";
import { ImageBackground, View, Text } from "react-native";

function ComingSoon(props) {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/coming.png")}
        resizeMode="repeat"
        style={{
          height: 20,
          width: 20,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </View>
  );
}

export default ComingSoon;
