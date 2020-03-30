import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AsyncStorage, StyleSheet, Text, View, Picker } from "react-native";

import Button from 'react-native-button';

import { writeToStorage, readFromStorage, removeFromStorage } from "../utils";

export default function TimeSelectorScreen({ navigation, route }) {

  const [day, setDay] = useState('14');

  useEffect(() => {
  }, []);


  const days = [];

  for (var i = 1; i <= 30; i++) {
    days.push(i);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Duration</Text>
      <Picker
        selectedValue={day}
        onValueChange={(val) => { setDay(val) }}
      >
        {days.map((item, index) => {
          return (
            <Picker.Item label={item.toString()} value={item.toString()} key={item} />
          );
        })}

      </Picker>
      <Button
        containerStyle={styles.buttonContainer}
        style={styles.button}
        onPress={async () => {
          await writeToStorage("quarantineDurationInDays", day);
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
  );
}



TimeSelectorScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    padding: 10
  },
  dummyStyle: { marginTop: 60 },
  button: {
    marginTop: 60,
    fontSize: 20,
    color: 'white',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#48BB78',
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
