import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Picker, Platform, Image } from "react-native";
import Button from "react-native-button";
import moment from "moment";

import { writeToStorage, readFromStorage, utilizeStartDate } from "../utils";

import { TASKS } from "../constants/Tasks";


import AppStyle from "../AppStyle";
import Colors from "../constants/Colors";

export default function TimeSelectorScreen({
  navigation,
  route: { params: { selectedStartDate } } = {}
}) {

  const [day, setDay] = useState('14');
  const days = [];

  for (var i = 1; i <= 30; i++) {
    days.push(i);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Duration</Text>
      {Platform.OS === 'android' &&
        <Image
          style={styles.image}
          source={require('../assets/images/time-selector.png')}
        />
      }
      <View style={Platform.OS === 'android' ? styles.buttonContainer : { flex: 1 }}>
        <View style={Platform.OS === 'android' && styles.pickerWrapper}>
          <Picker
            selectedValue={day}
            onValueChange={(val) => { setDay(val) }}
            style={Platform.OS === 'android' && styles.picker}
            prompt="Duration"
          >
            {days.map((item, index) => {
              return (
                <Picker.Item label={item.toString()} value={item.toString()} key={item} />
              );
            })}

          </Picker>
        </View>
        <View style={Platform.OS === 'ios' && styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={async () => {
              await writeToStorage("quarantineDurationInDays", day);
              await writeToStorage("quarantineStartDate", utilizeStartDate(JSON.parse(selectedStartDate)));
              await writeToStorage("tasks", TASKS.slice(0, day));
              navigation.reset({
                index: 0,
                routes: [{ name: 'App' }],
              });
              navigation.navigate("App");
            }}
          >
            Start
          </Button>
        </View>
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
  picker: {
    width: 300,
    color: Colors.green500
  },
  pickerWrapper: {
    ...AppStyle.outlinedButton,
    padding: 0,
    marginBottom: 20,
    alignItems: 'stretch',
    justifyContent: 'flex-start'

  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
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
    justifyContent: 'flex-end',
    marginBottom: 20
  }
});
