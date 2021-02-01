import React from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { openDrawer } from "../../../App";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

//temp posts

const posts = [
  {
    id: "1",
    name: "Lebron James",
    text: "I'll record a triple double tonight",
    timestamp: 1569109273726,
    avatar: require("../../../assets/exavatar1.jpg"),
    image: require("../../../assets/ex1.jpg"),
  },
  {
    id: "2",
    name: "Hürrem Sultan",
    text: "Suleiman my Love <3",
    timestamp: 1569109273726,
    avatar: require("../../../assets/exavatar1.jpg"),
    image: require("../../../assets/ex2.jpg"),
  },
  {
    id: "3",
    name: "Kanye West",
    text: "I made Taylor Swift famous",
    timestamp: 1569109273726,
    avatar: require("../../../assets/exavatar1.jpg"),
    image: require("../../../assets/ex3.jpg"),
  },
];

export default class LandingScreen extends React.Component {
  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>
            <Ionicons name="ios-more" size={24} color="#73788" />
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }

  static navigationOptions = {
    title: <Text>Home</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#ffff",
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: 60,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
    headerLeft: () => (
      <Icon
        name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
        style={{ marginLeft: 10 }}
        size={40}
        color="#ffff"
        onPress={() => openDrawer()}
        // onPress={() => Alert.alert('Hello world!')}
      />
    ),
  };
}
