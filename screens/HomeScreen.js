import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";
import CountDown from 'react-native-countdown-component';
import Button from 'react-native-button';

import { readFromStorage, removeFromStorage, writeToStorage } from "../utils/";

export default function HomeScreen({ navigation, route }) {
  const [loading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [quarantineDuration, setQuarantineDuration] = useState(0);
  const [quarantineCounter, setQuarantineCounter] = useState(0);

  useEffect(() => {
    async function getQuarantineCounter() {
      setIsLoading(true);
      // const savedQuarantineCounter = await readFromStorage("quarantineCounter");
      // console.log(savedQuarantineCounter);

      const date = await readFromStorage("quarantineStartDate");
      const duration = await readFromStorage("quarantineDuration");
      const durationInSeconds = parseInt(duration) * 24 * 60 * 60;
      const now = new Date();
      const quarantineDate = new Date(date);
      const nowWithExactDays = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const dateWithExactDays = new Date(quarantineDate.getFullYear(), quarantineDate.getMonth(), quarantineDate.getDate(), 0, 0, 0);
      setQuarantineCounter(nowWithExactDays.getTime() / 1000 + durationInSeconds - new Date(dateWithExactDays).getTime() / 1000);
      // await writeToStorage("quarantineCounter", quarantineCounter);
      // setDate(date ? new Date(date) : new Date());


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
            await removeFromStorage("quarantineDuration");
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
