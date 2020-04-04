import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import Button from "react-native-button";
import moment from "moment";

import { writeToStorage, readFromStorage, utilizeStartDate } from "../utils";

import { TASKS } from "../constants/Tasks";

import AppStyle from "../AppStyle";

export default function TimeSelectorScreen({
  navigation,
  route: { params: { selectedStartDate } } = {}
}) {
  const [day, setDay] = useState("14");

  useEffect(() => {}, []);

  const days = [];

  for (var i = 1; i <= 30; i++) {
    days.push(i);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Duration</Text>
      <Picker
        selectedValue={day}
        onValueChange={val => {
          setDay(val);
        }}
      >
        {days.map((item, index) => {
          return (
            <Picker.Item
              label={item.toString()}
              value={item.toString()}
              key={item}
            />
          );
        })}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={async () => {
            await writeToStorage("quarantineDurationInDays", day);
            // utilizeStartDate(JSON.parse(date));
            await writeToStorage(
              "quarantineStartDate",
              utilizeStartDate(JSON.parse(selectedStartDate))
            );
            await writeToStorage("tasks", TASKS.slice(0, day));

            navigation.reset({
              index: 0,
              routes: [{ name: "App" }]
            });
          }}
        >
          Start
        </Button>
      </View>
    </View>
  );
}

TimeSelectorScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false
};

const styles = StyleSheet.create({
  container: {
    ...AppStyle.container
  },
  header: {
    ...AppStyle.header
  },
  dummyStyle: { marginTop: 60 },
  button: {
    ...AppStyle.defaultButton
  },
  buttonContainer: {
    ...AppStyle.defaultButtonContainer,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 120
  }
});
