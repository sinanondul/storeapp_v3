import firebaseKeys from "./config";
import firebase from "firebase";
import moment from 'moment';
import MessagesScreen from "../screens/MessagesScreen/MessagesScreen";

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
  addMessage = async ({text, targetId}) =>{
    //Adding to target's messages.
    return new Promise((res, rej) => {
      this.firestore
        .collection('users')
        .doc(targetId)
        .collection('messages')
        .doc(this.uid)
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
  }

}

Fire.shared = new Fire();
export default Fire;
