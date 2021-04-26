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

export default class UserItem extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    userInfo: {},
  };

  componentDidMount() {
  }

  render() {
    return (
      //Alert.alert("this.state.userInfo.uid")

      <View
        style={{
          borderWidth: 3,
          height: 50,
          width: "90%",
          flexDirection: "column",
        }}
      >
        <Text>should be visible</Text>
        <View>{getAvatar(this.props.notification.lastSender)}</View> 
        <Text>{getName(this.props.notification.lastSender)}</Text>
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
  //         <View style={styles.buttonView}>
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
