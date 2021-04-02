import React from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import Fire from "../../../firebase/Fire";
import { Avatar } from "react-native-paper";
import moment from "moment";

import {
  getFullName,
  getAvatar,
  getHandle,
} from "../../../functions/UserInfoFormatter";
import InteractiveBar from "./InteractiveBar";
import styles from "../styles";

export default class AdItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
        <View style={styles.feedItem}>
          <View style={{ flex: 2 }}>
            <View
              style={styles.feedHeader}
              onPress={() => {
              }}
            >
              <Avatar.Text
                size={50}
                label={"SR"}
                style={{ backgroundColor: "#f4511e" }}
              />

              <View style={styles.userText}>
                <Text style={styles.name}>
                  {"Siel Roja"}
                </Text>

                <Text style={{
                  paddingLeft: 4,
                  paddingTop: 1,
                  fontSize: 14,
                  fontWeight: "normal",
                  color: "#2890cf",
                }}>
                  Sponsored Content
                </Text>
              </View>
            </View>

            <View style={styles.feedContent}>
              <View style={styles.mainText}>
                <Text style={styles.post}> Get the greatest burger in Bilkent! </Text>
              </View>
            </View>

            
            <Image
              style={styles.postImage}
              source={require('../../../../assets/hamburger.jpg')}
              resizeMode={"cover"}
            />
            
          </View>
        </View>
      </View>
    );
  }
}
