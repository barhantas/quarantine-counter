import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

import Colors from "../constants/Colors";

export function TaskDetail({ task: { challanges = [] } = {} }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {challanges.map(challange => (
        <View>
          <CheckBox
            title={challange.name}
            checked={isChecked}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.nameText}
            onPress={() => setIsChecked(!isChecked)}
          />
          <Text style={styles.descriptionText}>{challange.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  checkboxContainer: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    marginLeft: -6
  },
  nameText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8
  },
  descriptionText: {
    fontSize: 18,
    paddingLeft: 38,
    marginBottom: 24
  }
});
