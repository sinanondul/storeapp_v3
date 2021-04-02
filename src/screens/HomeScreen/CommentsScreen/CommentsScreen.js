//import { ScaleFromCenterAndroid } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";
import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import CommentItem from "../components/CommentItem";
import { Ionicons } from "@expo/vector-icons";

class CommentsScreen extends React.Component {
  state = {
    comments: ["whats up", "not much, u?", "not badd"],
    posts: [],
  };
  componentDidMount() {}

  renderItem = ({ item }) => {
    return <CommentItem {...this.props} post={item} />;
  };

  render() {
    return (
      <SafeAreaView style={{
          flex: 1,
          backgroundColor: "#f0fbff",
          margin: 10}
        }>
        <FlatList
          style={styles.feed}
          data={this.state.comments} //{this.state.posts.sort((a, b) => b.timestamp - a.timestamp)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="...add comment"
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderRadius: 15,
              height: 40,
              width: "80%",
            }}
          />
          <TouchableOpacity
            style={{
              borderRadius: 20,
              height: 40,
              backgroundColor: "steelblue",
              width: 60,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Ionicons
              style={{ alignSelf: "center" }}
              name="send-outline"
              size={20}
              color="white"
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default CommentsScreen;
