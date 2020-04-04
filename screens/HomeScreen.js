import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";
import CountDown from 'react-native-countdown-component';
import Button from 'react-native-button';

import { readFromStorage, removeFromStorage, writeToStorage } from "../utils/";
import moment from 'moment';

export default function HomeScreen({ navigation, route }) {
  const [loading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [quarantineDurationInDays, setQuarantineDuration] = useState(0);
  const [quarantineCounter, setQuarantineCounter] = useState(0);

  useEffect(() => {
    async function getQuarantineCounter() {
      setIsLoading(true);

      const date = await readFromStorage("quarantineStartDate");
      const duration = await readFromStorage("quarantineDurationInDays");
      const quarantineEndDate = moment(date).add(duration, 'days');
      const countDown = quarantineEndDate.diff(moment(), 'seconds')

      console.log('quarantineEndDate: ', quarantineEndDate);
      console.log('date: ', date);

      // const nowWithExactDays = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      // const dateWithExactDays = new Date(quarantineDate.getFullYear(), quarantineDate.getMonth(), quarantineDate.getDate(), 0, 0, 0);
      setQuarantineCounter(countDown);

      setIsLoading(false);
    }
    getQuarantineCounter();
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
        <Text style={styles.header}>Your Quarantine Ends In:</Text>
        <CountDown
          until={quarantineCounter}
          onPress={() => alert('hello')}
          size={20}
          digitStyle={styles.digitStyle}
          digitTxtStyle={styles.digitTxtStyle}
        />
        <Button
          containerStyle={styles.buttonContainer}
          style={styles.button}
          onPress={async () => {
            await removeFromStorage("quarantineStartDate");
            await removeFromStorage("quarantineDurationInDays");
            navigation.navigate("DateSelector");
            navigation.reset({
              index: 0,
              routes: [{ name: 'DateSelector' }],
            });
          }}
        >
          Finish My Quarantine
          </Button>
      </View>

    </View>
  );
}

HomeScreen.navigationOptions = {
  headerLeft: null,
  gesturesEnabled: false,
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
  dummyStyle: { marginTop: 60 },
  digitStyle: {
    backgroundColor: '#48BB78'
  },
  digitTxtStyle: {
    color: 'white'
  },
  button: {
    marginTop: 60,
    fontSize: 20,
    color: 'white',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#48BB78',
    width: 300,
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
