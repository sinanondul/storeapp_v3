import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen_old({ navigation }) {
  const [entityText, setEntityText] = useState("");
  const [entities, setEntities] = useState([]);

  const [currentUser, setUser] = useState("");
  // const [cuID, setID] = useState("");
  // const [cuID, setID] = useState("");
  // const [cuID, setID] = useState("");

  //const entityRef = firebase.firestore().collection("entities");
  //const userID = props.extraData.id;

  const usersRef = firebase.firestore().collection("users");

  const userName = usersRef.fullName;

  useEffect(() => {
    const cu = firebase.auth().currentUser;
    setUser(cu);
    //console.log(cu);
  }, []);

  // useEffect(()=>{
  //   usersRef

  // },[]);

  // console.log(firebase.auth().currentUser.email);
  // console.log(firebase.auth().currentUser.uid);
  // console.log(firebase.auth().currentUser.fullName);
  // useEffect(() => {
  //   entityRef
  //     .where("authorID", "==", userID)
  //     .orderBy("createdAt", "desc")
  //     .onSnapshot(
  //       (querySnapshot) => {
  //         const newEntities = [];
  //         querySnapshot.forEach((doc) => {
  //           const entity = doc.data();
  //           entity.id = doc.id;
  //           newEntities.push(entity);
  //         });
  //         setEntities(newEntities);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }, []);

  const onLogoutButtonPress = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          //
        },
        function (error) {
          console.log("didnotgoback");
          // An error happened.
        }
      );
  };
  // const onAddButtonPress = () => {
  //   if (entityText && entityText.length > 0) {
  //     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //     const data = {
  //       text: entityText,
  //       authorID: userID,
  //       createdAt: timestamp,
  //     };
  //     entityRef
  //       .add(data)
  //       .then((_doc) => {
  //         setEntityText("");
  //         Keyboard.dismiss();
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
  //   }
  // };

  // const renderEntity = ({ item, index }) => {
  //   return (
  //     <View style={styles.entityContainer}>
  //       <Text style={styles.entityText}>
  //         {index}. {item.text}
  //       </Text>
  //     </View>
  //   );
  // };

  return (
    //<View>
    <View style={styles.container}>
      {/* <Text>Hi {currentUser.email}</Text> */}
      <Text>{}</Text>
      {/* && currentUser.email}! */}
      <View>
        <TouchableOpacity style={styles.logoutbutton}>
          <Text style={styles.buttonText} onPress={onLogoutButtonPress}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.container}>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new entity"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEntityText(text)}
            value={entityText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {entities && (
          <View style={styles.listContainer}>
            <FlatList
              data={entities}
              renderItem={renderEntity}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
            />
          </View>
        )}
      </View> */}
    </View>
  );
}
