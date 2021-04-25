import firebaseKeys from "./config";
import firebase from "firebase";
import deleteCollection from "./deleteCollection";
import moment from "moment";
import { Alert } from "react-native";

import {getName} from "../functions/UserInfoFormatter";

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseKeys);
    } else {
      firebase.app();
    }
  }

  

  get firestore() {
    return firebase.firestore();
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }

  //Global functions

  deleteCollection = async(db, collectionPath, batchSize) => {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
  
  deleteQueryBatch = async(db, query, resolve) => {
    const snapshot = await query.get();
  
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }
  
    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
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
          commentCount: 0,
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
  upPost(userData, post) {

    //Local update.
    userData.upedPosts[post.id] = true;

    //Firebase consts.
    const userRef = this.firestore.collection('users').doc(userData.uid);
    const postRef = this.firestore.collection('posts').doc(post.id);
    const increment = firebase.firestore.FieldValue.increment(1);

    //Incrementing up count of post.
    postRef.update({upCount: increment})

    //Sending notification.
    if (post.senderId !== userData.uid) {
      this.addNotificationItem(this.getUpNotificationItem(userData, post));
    }

    //Server update.
    userRef.set({
      "upedPosts": userData.upedPosts
    }, {merge:true})
  }

  //Removing up (like) from already uped post.
  removeUpPost = async(userData, postId) => {
    //Local update.
    delete userData.upedPosts[postId];

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
    delete userData.favPosts[postId];

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

  //Messaging Stuff
  addChat = async ({ participantIds, groupChatInfo = null, creatorInfo }) => {
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
      query = query.where("groupChatInfo.name", "==", groupChatInfo.name);
    }

    //Check if chat with *exactly* same participants exists.
    await query.get().then((snapshot) => {
      snapshot.forEach(async(firestoreDocument) => {
          if  (Object.keys(firestoreDocument.data().participantIds).length === participantIds.length && 
              groupChatInfo && firestoreDocument.data().groupChatInfo || !groupChatInfo && !firestoreDocument.data().groupChatInfo) 
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
              await participantIds.forEach(async(participantId) => {
                let currUserChatsRef = this.firestore.collection('users').doc(participantId).collection('chats');

                await currUserChatsRef.where('id', '==', firestoreDocument.id).get().then((participantSnapshot) => {
                  participantSnapshot.forEach(async(participantDoc) => {
                    await currUserChatsRef.doc(participantDoc.id).delete();
                  })
                })
              })
              chatsRef.doc(firestoreDocument.id).delete();
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

        //If created group chat.
        if (groupChatInfo) {
          const youCreatedMessage = {
            text: "You created this group.",
            timestamp: timeCreated,
            system: true,
            // Any additional custom parameters are passed through
          }
          const createdMessage = {
            text: getName(creatorInfo) + " created this group.",
            timestamp: timeCreated,
            system: true,
            // Any additional custom parameters are passed through
          }
          const addedMessage = {
            text: getName(creatorInfo) + " added you.",
            timestamp: timeCreated + 1,
            system: true,
            // Any additional custom parameters are passed through
          }

          usersRef
            .where("id", "in", participantIds)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                const currentUser = doc.data().id === creatorInfo.uid;
                const chatRef = usersRef.doc(doc.data().id).collection("chats").doc(chatId)
                chatRef.set({
                  id: chatId,
                  groupChatInfo: groupChatInfo,
                  lastMessage: currentUser ? youCreatedMessage : addedMessage,
                  new: currentUser ? false : true,
                  newCount: currentUser ? 0 : 1,
                }).then(() => {
                  if (currentUser) {
                    chatRef.collection('messages').add(youCreatedMessage);
                  }
                  else {
                    chatRef.collection('messages').add(createdMessage);
                    chatRef.collection('messages').add(addedMessage);
                  }
                  res(chatInfo);
                });
              });
            });
        }
        else {
          usersRef.doc(creatorInfo.uid).collection('chats').doc(chatId).set({
            id: chatId,
            groupChatInfo: groupChatInfo,
            lastMessage: null,
            new: false,
            newCount: 0,
          }).then(() => {
            res(chatInfo);
          })
        }
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

  //Notifications

  addNotificationItem(notificationItem) {
    const notificationsRef = firebase.firestore().collection('users').doc(notificationItem.targetInfo.uid).collection('notifications');
    if (notificationItem.targetInfo.type === "post") {
      this.addPostNotification(notificationItem, notificationsRef);
    }
  }

  addPostNotification(notificationItem, notificationsRef) {
    const docString = "post_" + notificationItem.targetInfo.postId;
    if (notificationItem.targetInfo.action === "up") {
      this.addUpNotification(notificationItem, notificationsRef, docString)
    }
  }

  //Up notification generators.

  addUpNotification(notificationItem, notificationsRef, docString) {
    const finalDocString = docString + "_up";
    const notificationRef = notificationsRef.doc(finalDocString);

    notificationRef.get().then(notificationDoc => {
      if (notificationDoc.exists) {
        let previousNotification = notificationDoc.data();
        if (!previousNotification.senderIds[notificationItem.senderInfo.uid]) {
          let newNotification = this.createUpNotification(notificationItem, previousNotification);
          notificationRef.set({...newNotification})
        }
      }
      else {
        let newNotification = this.createUpNotification(notificationItem);
        notificationRef.set({...newNotification})
      }
    })
  }

  getUpNotificationItem(senderInfo, post) {
    return {
      targetInfo: {
        type: "post",
        action: "up",
        postId: post.id,
        uid: post.senderId,
      },
      senderInfo: {
        uid: senderInfo.uid,
        avatar: senderInfo.avatar,
        name: senderInfo.name,
      },
      timestamp: this.timestamp,
    };
  }

  createUpNotification(notificationItem, previousNotification = null)
  {
    let senderIds = previousNotification ? previousNotification.senders : {};
    senderIds[notificationItem.senderInfo.uid] = true;
    return {
      targetInfo: {
        type: notificationItem.targetInfo.type,
        action: notificationItem.targetInfo.action,
        postId: notificationItem.targetInfo.postId,
      },
      timestamp: notificationItem.timestamp,
      senderCount: previousNotification ? previousNotification.senderCount + 1 : 1,
      lastSender: notificationItem.senderInfo,
      senderIds: senderIds, 
      new: true,
    }
  }

  
  //Comment notification generators.

  addCommentNotification(notificationItem, notificationsRef, docString) {
    const finalDocString = docString + "_comment";
    const notificationRef = notificationsRef.doc(finalDocString);

    notificationRef.get().then(notificationDoc => {
      if (notificationDoc.exists) {
        let previousNotification = notificationDoc.data();
        if (!previousNotification.senderIds[notificationItem.senderInfo.uid]) {
          let newNotification = this.createUpNotification(notificationItem, previousNotification);
          notificationRef.set({...newNotification})
        }
      }
      else {
        let newNotification = this.createUpNotification(notificationItem);
        notificationRef.set({...newNotification})
      }
    })
  }

  getCommentNotificationItem(senderInfo, post) {
    return {
      targetInfo: {
        type: "post",
        action: "comment",
        postId: post.id,
        uid: post.senderId,
      },
      senderInfo: {
        uid: senderInfo.uid,
        avatar: senderInfo.avatar,
        name: senderInfo.name,
      },
      timestamp: this.timestamp,
    };
  }

  createCommentNotification(notificationItem, previousNotification = null)
  {
    let senderIds = previousNotification ? previousNotification.senders : {};
    senderIds[notificationItem.senderInfo.uid] = true;
    return {
      targetInfo: {
        type: notificationItem.targetInfo.type,
        action: notificationItem.targetInfo.action,
        postId: notificationItem.targetInfo.postId,
      },
      timestamp: notificationItem.timestamp,
      senderCount: previousNotification ? previousNotification.senderCount + 1 : 1,
      lastSender: notificationItem.senderInfo,
      senderIds: senderIds, 
      new: true,
    }
  }


  //Social Methods

  //
  follow = async ( userData, targetId ) => {
    const userRef = this.firestore.collection("users").doc(userData.uid);
    const targetUserRef = this.firestore.collection("users").doc(targetId);
    const timeFollowed = this.timestamp;

    //Local update.
    userData.following[targetId] = timeFollowed;

    //Server update for user.
    userRef.set({
      "following": userData.following
    }, {merge:true})

    //Server update for target.
    targetUserRef.set({ followers: {
      [userData.uid]: timeFollowed
    }}, {merge:true})
  };

  //
  unFollow = async ( userData, targetId ) => {
    const userRef = this.firestore.collection("users").doc(userData.uid);
    const targetUserRef = this.firestore.collection("users").doc(targetId);

    //Local update.
    delete userData.following[targetId];

    //Server update for user.
    userRef.set({ following: {
      [targetId]: firebase.firestore.FieldValue.delete()
    }}, {merge:true})

    //Server update for target.
    targetUserRef.set({ followers: {
      [userData.uid]: firebase.firestore.FieldValue.delete()
    }}, {merge:true})
  };

  //Courses

  addCourse = async (userData, courseInfo) => {};

  joinCourse = async (userData, courseId, sectionNumber = 0) => {
    const coursesRef = this.firestore.collection("courses");
    const sectionsRef = this.firestore.collection('sections');
    const userRef = this.firestore.collection('users').doc(userData.uid);
    const currTime = this.timestamp;

    //Get course sections.
    coursesRef
      .doc(courseId)
      .get()
      .then(firestoreDocument => {
        const courseData = firestoreDocument.data();
        const sectionIds = Object.keys(courseData.sections);
        const sectionNames = Object.values(courseData.sections);

        const generalId = sectionIds[sectionNames.indexOf('General')];

        //Adding to section participants list (as student).
        sectionsRef
          .doc(generalId)
          .get()
          .then(generalSectionDoc => {
            const sectionData = generalSectionDoc.data();
            let studentIds = sectionData.studentIds;
            studentIds[userData.uid] = true;
            sectionsRef.doc(generalId).set({
              "studentIds": studentIds
            }, {merge:true})
          })

        //Adding to user's own courses list.

        const sections = {[generalId]: {
          name: 'General',
          lastTimestamp: currTime,
          lastMessage: null,
          new: false,
          newCount: 0,
        }}

        userRef.collection('courses').doc(courseId).set({
          sections: sections,
          lastTimestamp: currTime,
          new: false,
          newCount: 0,
        })

      });
  };
}

Fire.shared = new Fire();
export default Fire;
