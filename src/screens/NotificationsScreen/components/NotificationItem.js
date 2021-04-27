import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Avatar, Badge, withBadge } from "react-native-paper";
import firebase from "firebase";
import moment from "moment";

import {
  getName,
  getFullName,
  getAvatar,
  getHandle,
  getAbout,
} from "../../../functions/UserInfoFormatter";
import Fire from "../../../firebase/Fire";
import styles from "../styles";
import { Icon } from "native-base";
import PostSpecificScreen from "../PostSpecificScreen";

function getTimeSince(timestamp) {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "now",
      ss: "%d",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      w: "1w",
      ww: "%dw",
      M: "1m",
      MM: "%dm",
      y: "1y",
      yy: "%d",
    },
  });
  return moment(timestamp).fromNow();
}

export default class NotificationItem extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    senderInfo: {},
    postImage: null,
    postText: "",
    postId: "",
  };

  componentDidMount() {
    const postRef = firebase
      .firestore()
      .collection("posts")
      .doc(this.props.notification.targetInfo.postId)
      .get()
      .then((doc) => {
        this.setState({ postText: doc.data().text });
      });

    const usersRef = firebase.firestore().collection("users");
  }

  render() {
    const notification = this.props.notification;
    //console.log(notification.targetInfo.action);
    return (
      <View
        style={[
          styles.outer,
          notification.new ? styles.outerNew : styles.outerOld,
        ]}
      >
        {notification.targetInfo.action == "comment" ? (
          //Comment NOTIF
          <View style={styles.rowView}>
            <View style={styles.avatarColumn2}>
              <TouchableOpacity>
                <View style={{ paddingTop: 5 }}>
                  {getAvatar(notification.lastSender, 45)}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.notificationTextColumn}>
              <View style={styles.notificationText}>
                <View>
                  <TouchableOpacity>
                    <Text style={{ fontWeight: "600" }}>
                      {getName(notification.lastSender)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {notification.senderCount == 1 ? (
                    <Text> Commented on your post</Text>
                  ) : // <Text>
                  //   and <Text>{notification.senderCount}</Text> others liked
                  //   your post
                  // </Text>
                  null}
                </View>
              </View>
              <View>
                <Text style={styles.txt}>{notification.text}</Text>
              </View>
            </View>
            <View style={styles.rightView}>
              <Text style={styles.time}>
                {getTimeSince(notification.timestamp)}
              </Text>
            </View>
          </View>
        ) : (
          //Up NOTIF
          <View style={styles.rowView}>
            <View style={styles.avatarColumn2}>
              <View style={{ paddingTop: 1, paddingLeft: 20 }}>
                <Icon name="heart" style={{ fontSize: 25, color: "red" }} />
              </View>
            </View>
            <View style={styles.notificationTextColumn}>
              <View></View>
              <View style={styles.notificationText}>
                <View>
                  <TouchableOpacity>
                    <Text style={{ fontWeight: "600" }}>
                      {getName(notification.lastSender)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  {notification.senderCount == 1 ? (
                    <Text> liked your Post</Text>
                  ) : (
                    <Text>
                      and <Text>{notification.senderCount}</Text> others liked
                      your post
                    </Text>
                  )}
                </View>
              </View>
              <View>
                <Text style={styles.txt}>{this.state.posttext}</Text>
              </View>
            </View>
            <View style={styles.rightView}>
              <Text style={styles.time}>
                {getTimeSince(notification.timestamp)}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  // render() {
  //   return (
  //     <View style={styles.outer}>
  //       <View style={styles.rowView}>
  //         <View style={styles.avatarColumn}>
  //           {this.state.userInfo ? getAvatar(this.state.userInfo, 55) : null}
  //         </View>
  //         <View style={styles.textColumn}>
  //           <View>
  //             <Text style={styles.name} numberOfLines={1}>
  //               {this.state.userInfo ? getFullName(this.state.userInfo) : null}
  //             </Text>
  //           </View>
  //           {/* {getHandle(this.state.userInfo) ? ( */}
  //           <View>
  //             <Text style={styles.handle} numberOfLines={1}>
  //               {this.state.userInfo
  //                 ? "@" + getHandle(this.state.userInfo)
  //                 : null}
  //             </Text>
  //           </View>
  //           {/* ) : null} */}
  //           {/* {getAbout(this.state.userInfo) ? ( */}
  //           <View>
  //             <Text>
  //               {this.state.userInfo ? getAbout(this.state.userInfo) : null}
  //             </Text>
  //           </View>
  //           {/* ) : null} */}
  //         </View>
  //         {/* TODO SELF PROFILE CHECK */}
  //         <View style={styles.rightView}>
  //           {this.state.userInfo &&
  //           this.state.userInfo.uid !== this.props.userData.uid ? (
  //             <FollowButton
  //               userData={this.props.userData}
  //               targetId={this.props.uid}
  //             />
  //           ) : null}
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }
}

const multiNotificationItem = {
  lastSender: {
    avatar: null,
    name: "tempuser",
    fullName: "tempUser x",
  },
  targetInfo: {
    type: "post",
    action: "up",
    postId: null,
  },
  new: false,
  senderCount: 3,
  timestamp: 1619347662400,
};

const singleNotificationItem = {
  lastSender: {
    avatar: null,
    name: "tempuser",
    fullName: "tempUser x",
  },
  targetInfo: {
    type: "post",
    action: "comment",
    postId: null,
    text:
      "A comment asdjfkjasdflasdlkfjaslkdj fasjdlkfaljksdnfjkansdjkfnakjsdnfkjasnkdjfnajhsdgvcsoakpoej rbahıdsbcıans0eısadfadfmasdklfmlkasdmfamsldkf mlaksdmfasmdlkfmaslkdfmlasd",
  },
  senderCount: 1,
  new: true,
  timestamp: 1619347662401,
};
