import firebaseKeys from "./config";
import firebase from "firebase";
import moment from 'moment';
import MessagesScreen from "../screens/MessagesScreen/MessagesScreen";
import { Alert } from "react-native";

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseKeys);
    }
    else {
      firebase.app();
    }
  }

  //Post Stuff
  addPost = async ({ text, localUri }) => {
    var remoteUri = null;
    if (localUri != null) {
      remoteUri = await this.uploadPhotoAsync(localUri);
    }

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

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
  addChat = async({targetIds, chatInfo = null}) => {

    const chatsRef = this.firestore.collection('chats');

    
    const createdChat = await chatsRef.add(
      {
        participantIds: [],
        messages: [],
        latestTimestamp: this.timestamp(),
        latestMessage: null,
        chatInfo: chatInfo
      }
    );
    
    const chatId = createdChat.id;
    const usersRef = this.firestore.collection('users');

    return new Promise((res, rej) => {
      const snapshot = await usersRef.where('id', 'in', targetIds).get();
      snapshot
      .forEach(doc => {
        doc.FieldValue.arrayUnion(chatId);
      })
      .then((ref) => {
        res(ref);
      })
      .catch((error) => {
        rej(error);
      });

    })

  }

  addMessage = async ({senderId, text, targetId}) =>{
    //Adding to target's messages.
    const senderRef = this.firestore.collection('users').doc(targetId).collection('messages').doc(senderId);
      senderRef.get()
        .then((senderDoc) => {
          if (!senderDoc.exists) {
            senderRef.set({
              id: senderId,
            })
          }
          senderRef.set({
            lastMessage: text,
            lastTimestamp: this.timestamp})
    return new Promise((res, rej) => {
      
          senderRef
            .collection('messages')
            .add({ 
              text,
              timestamp: this.timestamp,
            })
            .then((ref) => {
              res(ref);
            })
            .catch((error) => {
              rej(error);
            });
      });
    });
  }
}

Fire.shared = new Fire();
export default Fire;
