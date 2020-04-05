import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


import Colors from "../constants/Colors";

export function TaskListItem({ name, onPress, isCompleted, isCurrentDay, challenges }) {

  
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
        <View style={[styles.progress, {width: getTaskProgress(challenges)}]}>
        </View>
      <Text style={styles.text}>{name}</Text>
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

const getTaskProgress = (challenges) => {
  const total = challenges.length;
  const completed = challenges.filter( challenge => {
    return challenge.isCompleted;
  }).length;
  return `${(completed / total).toFixed(2) *100}%`;

};

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
