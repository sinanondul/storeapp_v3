import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import ChosenUsersDisplay from "./components/ChosenUsersDisplay";
import UserItem from "./components/UserItem";
import BottomRightButton from "../../components/BottomRightButton";
import styles, { CustomizeGroupChatScreenStyles as pageStyles } from "./styles";

import Fire from "../../firebase/Fire";
import firebase from "firebase";

const usersRef = firebase.firestore().collection("users");

function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

export default class AddGroupChatScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    groupName: null,
    participantIds: null,
  };

  componentDidMount() {
    const participants = this.props.route.params.participants;
    let participantIds = [this.props.userData.uid];
    var getParticipantIds = new Promise((resolve, reject) => {
      participants.forEach((participant, index, array) => {
        participantIds.push(participant.uid);
        if (index === array.length - 1) resolve();
      });
    });
    getParticipantIds.then(() => {
      this.setState({ participantIds: participantIds });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={pageStyles.groupInfoContainer}>
          <View style={pageStyles.groupInfoIcon} />
          <View style={pageStyles.groupInfoTextContainer}>
            <TextInput
              outerFocus={true}
              multiline={false}
              placeholder="Group name..."
              style={pageStyles.groupInfoText}
              onChangeText={(text) => this.setState({ groupName: text })}
              value={this.state.text}
            />
            <View style={pageStyles.groupInfoUnderline} />
          </View>
        </View>
        <View style={pageStyles.participantsContainer}>
          <Text style={pageStyles.participantsTitle}>
            {"Participants: " +
              this.props.route.params.participants.length.toString()}
          </Text>
          <View>
            <ChosenUsersDisplay
              {...this.props}
              participants={this.props.route.params.participants}
            />
          </View>
        </View>
        {this.state.groupName ? (
          <BottomRightButton
            {...this.props}
            name={
              Platform.OS === "ios"
                ? "ios-checkmark-circle"
                : "md-checkmark-circle"
            }
            onPress={() => {
              const groupChatInfo = {
                name: this.state.groupName,
                avatar: null,
                admins: [this.props.userData.uid],
              };
              Fire.shared
                .addChat({
                  participantIds: this.state.participantIds,
                  groupChatInfo: groupChatInfo,
                })
                .then((chatInfo) => {
                  this.props.navigation.goBack();
                  this.props.navigation.goBack();
                  this.props.navigation.goBack();
                  this.props.navigation.navigate("Messaging", {
                    chat: chatInfo,
                  });
                });
            }}
          />
        ) : null}
      </View>
    );
  }

  static navigationOptions = {
    title: "Add subject...",
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: 60,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
  };
}
