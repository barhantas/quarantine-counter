import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


import Colors from "../constants/Colors";

export function TaskListItem({ name, onPress, isCompleted, isCurrentDay, checkedChallengeCount }) {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => {
        onPress();
      }}
    >

      <View
        style={[
          styles.container,
          isCompleted && { backgroundColor: Colors.green500 }
        ]}
      >
        {/* TODO: get checked challenges, calculate progress and width */}
        <View style={[styles.progress, {width: 0}]}>
        </View>
        <Text style={styles.text}>{name}</Text>
        {/* <Text style={styles.text}>{checkedChallengeCount}</Text> */}
        <MaterialIcons
          name={isCompleted ? "check-circle" : 'radio-button-unchecked'}
          size={24}
          color={Colors.white}
          style={styles.isCompletedIcon}
        />


      </View>
    </TouchableOpacity>
  );
}

function getTaskProgress() {

}

const styles = StyleSheet.create({
  // wrapper: { borderBottomWidth: 1, borderBottomColor: Colors.grey100 },
  wrapper: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    width: '90%',
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    borderRadius: 15,
    backgroundColor: Colors.green300,
  },
  progress: {
    position: 'absolute',
    borderRadius: 15,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    backgroundColor: Colors.green500
  },
  text: {
    fontSize: 18,
    color: Colors.white,
    marginLeft: 20,
    marginRight: 'auto'
  },
  isCompletedIcon: {
    marginLeft: 'auto',
    marginRight: 20
  }
});
