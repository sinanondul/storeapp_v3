import React from "react";
import { View, Text, FlatList, Alert, Platform } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";

import ChatItem from "./components/ChatItem";
import GroupChatItem from "./components/GroupChatItem";
import BottomRightButton from "../../components/BottomRightButton";

import styles from "./styles";

export default class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    chats: [],
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({ item }) => {
    return item.groupChatInfo ? (
      <GroupChatItem
        {...this.props}
        chat={item}
        handleDelete={this.handleDelete}
      />
    ) : (
      <ChatItem {...this.props} chat={item} handleDelete={this.handleDelete} />
    );
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          tintColor={"#fff"}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      ),
    });
    this.setState({ chats: this.props.chats });
  }

  componentWillUnmount() {}

  handleDelete(chatId) {
    let chatsArray = this.state.chats;
    const index = chatsArray.findIndex((item) => item.id === chatId);
    chatsArray.splice(index, 1);
    this.setState({ chats: chatsArray });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.chats.sort((a, b) => b.timestamp - a.timestamp)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
        />
        <BottomRightButton
          {...this.props}
          name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
          onPress={() => {
            this.props.navigation.navigate("AddChat");
          }}
        />
      </View>
    );
  }

  static navigationOptions = {
    title: <Text style={{ alignSelf: "center", paddingTop: 2 }}>Messages</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      //paddingRight: 60,

      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
  };
}
