import firebaseKeys from "./config";
import firebase from "firebase";
import moment from 'moment';
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
  addChat = async({participantIds, chatInfo = null}) => {

    const chatsRef = this.firestore.collection('chats');
    const timeCreated = this.timestamp();

    
    const createdChat = await chatsRef.add(
      {
        participantIds: participantIds,
        messages: [],
        lastTimestamp: timeCreated,
        lastMessage: null,
        chatInfo: chatInfo
      }
    );
    
    const chatId = createdChat.id;
    const usersRef = this.firestore.collection('users');

    return new Promise((res, rej) => {
      const snapshot = usersRef.where('id', 'in', targetIds).get();
      snapshot
      .forEach(doc => {
        doc.collection("chats").add({
          id: chatId,
          new: true,
          newCount: 0,
        })
      })
      .then((ref) => {
        res(ref);
      })
      .catch((error) => {
        rej(error);
      });

    })

  }

  resetNewCount = async ({uid, chatId}) => {
    const chatsRef = this.firestore.collection('users').doc(uid).collection('chats');
    var chatRef;

    
    
    return new Promise((res, rej) => {
      chatsRef
        .where('id', '==', chatId)
        .get()
        .then(response => {
          response.docs.forEach((doc) => {
            chatsRef.doc(doc.id).update({newCount: 0})
              .then((ref) => {
                res(ref);
              })
              .catch((error) => {
                rej(error);
              });
          })
        })
        
    })
  }

  addMessage = async ({senderId, text, chatId, participantIds}) =>{

    const chatRef = this.firestore.collection('chats').doc(chatId);
    const messagesRef = chatRef.collection('messages');
    const usersRef = this.firestore.collection('users');
    const timeCreated = this.timestamp;

    await chatRef.update({lastMessage: text, lastTimestamp: timeCreated})

    await participantIds.forEach((participantId) => {
      usersRef
      .doc(participantId)
      .collection('chats')
      .where('id', '==', chatId)
      .get()
      .then(response => {
        response.docs.forEach((doc) => {
            const docRef = usersRef.doc(participantId).collection('chats').doc(doc.id)
            var newCount;
            docRef.get().then((firestoreDocument) => {
              const docData = firestoreDocument.data();
              if (docData.newCount)
                newCount = docData.newCount;
              else
                newCount = 0;
              if (participantId !== senderId){
                newCount = newCount + 1;
              }
              docRef.update({lastTimestamp: timeCreated, newCount: newCount})
            })
        })
      })
    })

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
}

Fire.shared = new Fire();
export default Fire;
