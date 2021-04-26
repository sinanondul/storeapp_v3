import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Avatar, Badge, withBadge } from "react-native-paper";
import firebase from "firebase";
import moment from "moment";

import {
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
    //console.log(this.props.notification);
    //firebase.auth().currentUser;
    // const notificationsRef = firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(this.props.userData.uid)
    //   .collection("notifications");
    // notificationsRef
    //   .get()
    //   .then((doc) => {
    //     if (doc) {
    //       doc.forEach((doc) => {
    //         console.log("Document data:", doc.data());
    //         this.setState({
    //           notifications: {
    //             lastSender: {
    //               avatar: doc.data().avatar,
    //               name: doc.data().name,
    //               uid: doc.data().uid,
    //             },
    //             new: doc.data().new,
    //             senderCount: doc.data().senderCount,
    //             senderIds: doc.data().senderIds,
    //             targetInfo: {
    //               action: doc.data().action,
    //               postId: doc.data().postId,
    //               type: doc.data().type,
    //             },
    //             timestamp: doc.data().timestamp,
    //           },
    //         });
    //       });
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error getting document:", error);
    //   });
    //alert(notificationsRef);
    // var user = firebase.auth().currentUser;
    //const usersRef = firebase.firestore().collection("users").doc();
    // this.setState({
    //   userInfo: {
    //     uid: user.id,
    //     email: user.email,
    //     fullName: user.fullName,
    //     name: user.name,
    //     surename: user.surename,
    //     avatar: user.avatar,
    //     handle: user.handle,
    //     location: user.location,
    //     department: user.department,
    //     phone: user.phone,
    //     about: user.about,
    //     myPosts: user.myPosts,
    //     upedPosts: user.upedPosts,
    //     favPosts: user.favPosts,
    //     following: user.following,
    //     followers: user.followers,
    //     myComments: user.myComments,
    //     token: user.token,
    //   },
    // });
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
        {/* <View>{this.props.notification.lastSender.avatar} </View> */}
        {/* <Text>{this.props.notification.lastSender.name}</Text> */}
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
