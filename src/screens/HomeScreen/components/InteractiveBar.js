import React from "react";
import {
  View,
  Image,
  Platform,
  Text,
  Alert,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import Fire from "../../../firebase/Fire";

import styles from "./styles";

export default class InteractiveBar extends React.Component {
  state = {
    uped: false,
    faved: false,
    posts: [],
  };

  componentDidMount() {
    this.setState({ uped: this.props.post.uped, faved: this.props.post.faved });
  }

  toggleUped = () => {
    if (!this.state.uped) {
      Fire.shared.upPost(this.props.userData, this.props.post);
      this.props.post.upCount = this.props.post.upCount + 1;
      this.setState({ uped: true });
    } else {
      Fire.shared.removeUpPost(this.props.userData, this.props.post.id);
      this.props.post.upCount = this.props.post.upCount - 1;
      this.setState({ uped: false });
    }
  };

  toggleFaved = () => {
    if (!this.state.faved) {
      Fire.shared.favPost(this.props.userData, this.props.post.id);
      this.setState({ faved: true });
    } else {
      Fire.shared.removeFavPost(this.props.userData, this.props.post.id);
      this.setState({ faved: false });
    }
  };

  render() {
    const { modalVisible } = this.state;
    const post = this.props.post;
    const upCount = post.upCount;
    const commentCount = post.commentCount;
    return (
      <View style={styles.interactiveBar}>
        <TouchableOpacity style={styles.button} onPress={this.toggleUped}>
          {this.state.uped ? (
            <View style={styles.buttonInner}>
              <Image
                source={require("../assets/Post_UP_Icon_Filled.png")}
                style={{ width: 20, height: 20, borderRadius: 14 }}
                resizeMode="stretch"
              />
              <Text style={styles.upedText}>{upCount}</Text>
            </View>
          ) : (
            <View style={styles.buttonInner}>
              <Image
                source={require("../assets/Post_UP_Icon_Outline.png")}
                style={{ width: 20, height: 20, borderRadius: 14 }}
                resizeMode="stretch"
              />
              <Text style={styles.regularText}>{upCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.props.toggleCommentsModal}
        >
          <View style={styles.buttonInner}>
            <Ionicons
              style={styles.intButtons}
              name="chatbox-outline"
              size={20}
              color="#73788"
            />
            <Text style={styles.regularText}>{commentCount}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons
            style={styles.intButtons}
            name="send-outline"
            size={20}
            color="#73788"
          />
        </TouchableOpacity>

        {this.state.faved ? (
          <TouchableOpacity onPress={this.toggleFaved}>
            <Ionicons
              style={styles.intButtons}
              name="bookmark"
              size={20}
              color="#f4511e"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.toggleFaved}>
            <Ionicons
              style={styles.intButtons}
              name="bookmark-outline"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        )}
        
      </View>
    );
  }
}