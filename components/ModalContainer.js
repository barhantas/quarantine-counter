import * as React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export function ModalContainer({
  title,
  isModalVisible,
  toggleModal,
  children
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.container}>

        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              toggleModal();
            }}
          >
            <AntDesign name="close" size={32} color={Colors.black} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  modalView: {
    flex: 1,
    marginVertical: 1,
    marginHorizontal: 4,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    alignSelf: "center",
    zIndex: 99,
    fontSize: 24,
    marginTop: -16,
    paddingBottom: 60
  },
  closeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 99
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
