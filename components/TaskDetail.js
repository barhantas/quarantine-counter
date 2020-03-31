import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

import Colors from "../constants/Colors";

export function TaskDetail({ task: { challanges = [] } = {} ,onChallangesFinished}) {
  const [checkedChallanges, setCheckedChallanges] = useState({});

  useEffect(() => {
    const checkedChallangeCount = Object.keys(checkedChallanges).filter(
      key => checkedChallanges[key] === true
    ).length;

    if(challanges.length === checkedChallangeCount){
      onChallangesFinished()
    }
  }, [checkedChallanges]);

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {challanges.map(({ name, description }) => (
        <View>
          <CheckBox
            title={name}
            checked={checkedChallanges[name]}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.nameText}
            onPress={() => {
              setCheckedChallanges({
                ...checkedChallanges,
                [name]: !checkedChallanges[name]
              });
            }}
          />
          <Text style={styles.descriptionText}>{description}</Text>
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
