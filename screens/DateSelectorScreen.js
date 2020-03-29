import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import Button from 'react-native-button';

import { writeToStorage, readFromStorage, removeFromStorage } from "../utils";

export default function DateSelectorScreen({ navigation, route }) {
  const [loading, setIsLoading] = useState(new Date(1598051730000));
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);

    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  useEffect(() => {
    let isCancelled = false;
    async function getQuarantineStartDate() {
      setIsLoading(true);
      const date = await readFromStorage("quarantineStartDate");
      if (date) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }],
        });
        navigation.navigate('App');
      }
      setDate(date ? new Date(date) : new Date());
      setIsLoading(false);
    }
    if (!isCancelled) {
      getQuarantineStartDate();
    }
    return () => {
      isCancelled = true;
    };
  }, []);


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

        <View>
          <Text style={styles.header}>Choose Start Date</Text>
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            maximumDate={new Date()}
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.button}
            onPress={async () => {
              await writeToStorage("quarantineStartDate", date);
              navigation.navigate("TimeSelector");
            }}
          >
            Next
          </Button>
        </View>
    </View>
  );
}

DateSelectorScreen.navigationOptions = {
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
    padding: 20
  },
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
