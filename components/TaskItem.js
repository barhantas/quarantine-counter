import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

export function TaskItem({ name,onPress }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress()
        console.log("name", name);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.green100,
    alignItems: "center"
  },
  text: {
    fontSize: 18
  }
});
