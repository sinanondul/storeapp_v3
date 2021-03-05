import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReportModal = (props) => {
  const shareClicked = () => {
    Alert.alert("Copied to clipboard!");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        //setModalVisible(!modalVisible);
        //props.modalVisible = false;
      }}
    >
      <View style={styles.centeredView}>
        <TouchableOpacity>
          <Text style={styles.modalText}>Report Inapprotriate Content</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="arrow-redo-outline" size={24} color="#73788" />
          <Text onPress={shareClicked()}>Share</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {},
  row: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
});

export default AddModal;
