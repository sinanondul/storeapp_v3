import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeJdnimyvsZk80KS4pB1Ea-2CFVYrLhpY",
  authDomain: "newap-a871c.firebaseapp.com",
  projectId: "newap-a871c",
  storageBucket: "newap-a871c.appspot.com",
  messagingSenderId: "125486026046",
  appId: "1:125486026046:web:95a45bc7a6be83b328706f",
  measurementId: "G-NBYM6W0D49",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
