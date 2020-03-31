import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export function TaskListItem({ name, onPress, isCompleted }) {
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
          isCompleted && { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }
        ]}
      >
        {isCompleted && (
          <AntDesign
            name="checkcircleo"
            size={24}
            color={Colors.green100}
            style={styles.isCompletedIcon}
          />
        )}
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderBottomWidth: 1, borderBottomColor: Colors.grey100 },
  container: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: Colors.white
  },
  text: {
    fontSize: 18
  },
  isCompletedIcon: {
    marginLeft: -60,
    paddingRight: 40
  }
});
