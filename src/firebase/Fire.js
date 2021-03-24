import firebaseKeys from "./config";
import firebase from "firebase";
import deleteCollection from "./deleteCollection";
import moment from "moment";
import { Alert } from "react-native";

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseKeys);
    } else {
      firebase.app();
    }
  }

  //Post Stuff

  //Adding a post.
  addPost = async ({ userData, text, localUri }) => {
    var remoteUri = null;
    if (localUri != null) {
      remoteUri = await this.uploadPhotoAsync(localUri);
    }

    const userRef = this.firestore.collection('users').doc(userData.uid);

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
          upCount: 0,
          comments: {},
        })
        .then((ref) => {
          userData.myPosts[ref.id] = true;
          userRef.set({
            "myPosts": userData.myPosts
          }, {merge:true})
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  //Upping (liking) a post.
  upPost(userData, postId) {

    //Local update.
    userData.upedPosts[postId] = true;

    //Firebase consts.
    const userRef = this.firestore.collection('users').doc(userData.uid);
    const postRef = this.firestore.collection('posts').doc(postId);
    const increment = firebase.firestore.FieldValue.increment(1);

    //Incrementing up count of post.
    postRef.update({upCount: increment})

    //Server update.
    userRef.set({
      "upedPosts": userData.upedPosts
    }, {merge:true})
  }

  //Removing up (like) from already uped post.
  removeUpPost = async(userData, postId) => {
    //Local update.
    delete userData.upedPosts.postId;

    //Firebase consts.
    const userRef = this.firestore.collection('users').doc(userData.uid);
    const postRef = this.firestore.collection('posts').doc(postId);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    //Incrementing up count of post.
    postRef.update({upCount: decrement})

    //Server update.
    userRef.set({ upedPosts: {
      [postId]: firebase.firestore.FieldValue.delete()
    }}, {merge:true})
  }

  //Favouriting post.
  favPost(userData, postId) {

    //Local update.
    userData.favPosts[postId] = true;

    //Firebase consts.
    const userRef = this.firestore.collection('users').doc(userData.uid);

    //Server update.
    userRef.set({
      "favPosts": userData.favPosts
    }, {merge:true})
  }

  //Removing post from favourites.
  removeFavPost = async(userData, postId) => {
    //Local update.
    delete userData.favPosts.postId;

    //Firebase consts.
    const userRef = this.firestore.collection('users').doc(userData.uid);

    //Server update.
    userRef.set({ favPosts: {
      [postId]: firebase.firestore.FieldValue.delete()
    }}, {merge:true})
  }

  //Uploading local image to cloud storage.
  uploadPhotoAsync = async (uri) => {
    const path = `photos/${this.uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  get firestore() {
    return firebase.firestore();
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }

  //Messaging Stuff
  addChat = async ({ participantIds, groupChatInfo = null }) => {
    const chatsRef = this.firestore.collection("chats");
    const timeCreated = this.timestamp;
    var alreadyExists = false;
    var chatInfo = {
      id: null,
      lastMessage: null,
      participantIds: participantIds,
      groupChatInfo: groupChatInfo,
    };
    var chatId;
    var participantMap = {};
    var query = chatsRef;

    //Check if chat with same participants exists.
    var i;
    for (i = 0; i < participantIds.length; i++) {
      const participantId = participantIds[i];
      participantMap[participantId.toString()] = true;
      query = query.where(
        "participantIds." + participantId.toString(),
        "==",
        true
      );
    }

    //Check if group chat with same name exists.
    if (groupChatInfo) {
      query.where("groupChatInfo.name", "==", groupChatInfo.name);
    }

    //Check if chat with *exactly* same participants exists.
    await query.get().then((snapshot) => {
      snapshot.forEach((firestoreDocument) => {
          if (Object.keys(firestoreDocument.data().participantIds).length === participantIds.length)
          {
            if (firestoreDocument.data().lastMessage)
            {
              alreadyExists = true;
              chatId = firestoreDocument.id;
              chatInfo.id = chatId;
              chatInfo.groupChatInfo = firestoreDocument.data().groupChatInfo;
              chatInfo.lastMessage = firestoreDocument.data().lastMessage;
            }
            else 
            {
              let previousData = firestoreDocument.get().data();
              previousData.groupChatInfo = groupChatInfo;
              firestoreDocument.ref.set(previousData);
            }
          }
      })
    })
    
    //Create chat item.
    if (!alreadyExists) {
      const createdChat = await chatsRef.add({
        participantIds: participantMap,
        lastTimestamp: timeCreated,
        lastMessage: null,
        groupChatInfo: groupChatInfo,
      });

      chatId = createdChat.id;
      chatInfo.id = chatId;
    }

    //Add chat if doesn't exist and return.
    const usersRef = this.firestore.collection("users");
    return new Promise((res, rej) => {
      if (!alreadyExists) {
        usersRef
          .where("id", "in", participantIds)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              usersRef.doc(doc.data().id).collection("chats").add({
                id: chatId,
                lastTimestamp: timeCreated,
                new: true,
                newCount: 0,
              });
            });
            res(chatInfo);
          });
      } else {
        res(chatInfo);
      }
    });
  };

  resetNewCount = async ({ uid, chatId }) => {
    const chatsRef = this.firestore
      .collection("users")
      .doc(uid)
      .collection("chats");
    var chatRef;

    return new Promise((res, rej) => {
      chatsRef
        .where("id", "==", chatId)
        .get()
        .then((response) => {
          response.docs.forEach((doc) => {
            chatsRef
              .doc(doc.id)
              .update({ new: false, newCount: 0 })
              .then((ref) => {
                res(ref);
              })
              .catch((error) => {
                rej(error);
              });
          });
        });
    });
  };

  addMessage = async ({ senderId, text, chatId, participantIds }) => {
    const chatRef = this.firestore.collection("chats").doc(chatId);
    const messagesRef = chatRef.collection("messages");
    const usersRef = this.firestore.collection("users");
    const timeCreated = this.timestamp;

    await chatRef.update({ lastMessage: text, lastTimestamp: timeCreated });

    await participantIds.forEach((participantId) => {
      usersRef
        .doc(participantId)
        .collection("chats")
        .where("id", "==", chatId)
        .get()
        .then((response) => {
          response.docs.forEach((doc) => {
            const docRef = usersRef
              .doc(participantId)
              .collection("chats")
              .doc(doc.id);
            var newCount;
            docRef.get().then((firestoreDocument) => {
              const docData = firestoreDocument.data();
              if (docData.newCount) newCount = docData.newCount;
              else newCount = 0;
              if (participantId !== senderId) {
                newCount = newCount + 1;
              }
              docRef.update({ lastTimestamp: timeCreated, newCount: newCount });
            });
          });
        });
    });

    return new Promise((res, rej) => {
      messagesRef
        .add({ 
          text,
          timestamp: timeCreated,
          senderId: senderId,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
      });
  }

  setAdmin = async(chatId, uid) => {
    let chatRef = this.firestore.collection('chats').doc(chatId);
    return new Promise((resolve, reject) => {
      chatRef.get().then(doc => {
        const docData = doc.data();
        let adminsArray = docData.groupChatInfo.admins;
        if (!adminsArray.includes(uid)) {
          adminsArray.push(uid);
          this.firestore.collection('chats').doc(chatId).set({
            lastMessage: docData.lastMessage,
            lastTimestamp: docData.lastTimestamp,
            participantIds: docData.participantIds,
            groupChatInfo: {
              avatar: docData.groupChatInfo.avatar,
              name: docData.groupChatInfo.name,
              admins: adminsArray
            }
          })
          .then((ref) => {
            resolve(ref);
          })
        }
        else {
          resolve();
        }
      })
    })
  }

  deleteChat = async ({ uid, chatId }) => {
    //Setting deleted timestamp.
    const userRef = this.firestore().collection("users").doc(uid);
    userRef
      .collection("chats")
      .where("id", "==", chatId)
      .get()
      .then((response) => {
        response.docs.forEach((doc) => {
          doc.ref.update({ deletedTimestamp: this.timestamp });
        });
      });
  };

  leaveGroupChat = async ({ uid, chatId }) => {
    //Deleting from current user's chats.
    const userRef = this.firestore().collection("users").doc(uid);
    userRef
      .collection("chats")
      .where("id", "==", chatId)
      .get()
      .then((response) => {
        response.docs.forEach((doc) => {
          doc.ref.delete();
        });
      });

    //Removing user from chat document.
    const chatRef = this.firestore().collection("chats").doc(chatId);
    var participantMap = {};
    participantMap["participantIds." + uid] = false;
    await chatRef.update(participantMap);

    //Delete chat document if all users have left.

    var stillLeft = false;
    await chatRef.get().then((firestoreDocument) => {
      const participantsArray = firestoreDocument.data().participantIds;
      participantsArray.forEach((participantExists) => {
        if (participantExists) {
          stillLeft = true;
        }
      });
    });
    if (!stillLeft) {
      deleteCollection(chatRef, "messages", 100).then(() => {
        chatRef.delete();
      });
    }
  };

  //Social Methods
  follow = async ({ userID, targetID }) => {
    const userRef = this.firestore.collection("users").doc(userID);
    const targetUserRef = this.firestore.collection("users").doc(targetID);
    const followingRef = userRef.collection("following");
    const followersRef = targetUserRef.collection("followers");
    const timeFollowed = this.timestamp;
    Alert.alert(userID);
    Alert.alert(targetID);
    return new Promise((res, rej) => {
      followersRef
        .add({
          userID,
          timestamp: timeFollowed,
        })
        .then((ref) => {
          followingRef
            .add({
              targetID,
              timestamp: timeFollowed,
              followerDocId: ref.id,
            })
            .then((ref) => {
              res(ref);
            })
            .catch((error) => {
              rej(error);
            });
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  // unfollow = async ({ userID, targetID }) => {
  //   const userRef = this.firestore.collection("users").doc(userID);
  //   const targetUserRef = this.firestore.collection("users").doc(targetID);
  //   const followingRef = userRef.collection("following");
  //   const followersRef = targetUserRef.collection("followers");
  //   //const timeFollowed = this.timestamp;
  //   Alert.alert(userID);
  //   Alert.alert(targetID);
  //   return new Promise((res, rej) => {
  //     followingRef.doc(targetID).remove();
  //   });
  // };

  //Courses

  addCourse = async (uid, courseInfo) => {};

  joinCourse = async (uid, courseCode, sectionNumber) => {
    const coursesRef = this.firestore.collection("courses");
    var alreadyExists = false;
    var courseId = null;

    //Check if course already exists.
    coursesRef
      .where("code", "==", courseCode)
      .get()
      .then((snapshot) => {
        snapshot.forEach((firestoreDocument) => {
          alreadyExists = true;
          courseId = firestoreDocument.id();
        });
      });

    //Create course if doesn't exist.

    //Join course if exists.
  };
}

Fire.shared = new Fire();
export default Fire;
