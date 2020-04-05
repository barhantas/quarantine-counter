import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Alert } from "react-native";
import moment from "moment";
import CountDown from "react-native-countdown-component";
import Button from "react-native-button";

import { QuarantineProgress } from "../components";
import { readFromStorage, removeFromStorage } from "../utils/";

import AppStyle from "../AppStyle";

export default function HomeScreen({ navigation, route }) {
  const [loading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [quarantineDurationInDays, setQuarantineDuration] = useState(0);
  const [quarantineCounter, setQuarantineCounter] = useState(0);

  const [quarantineEndDate, setQuarantineEndDate] = useState(0);

  useEffect(() => {
    async function getQuarantineCounter() {
      setIsLoading(true);

      const date = await readFromStorage("quarantineStartDate");
      const duration = await readFromStorage("quarantineDurationInDays");
      setQuarantineDuration(duration);
      const quarantineEndDate = moment(date).add(duration, "days");
      setQuarantineEndDate(quarantineEndDate);

      const countDown = quarantineEndDate.diff(moment(), "seconds");

      setQuarantineCounter(countDown);

      setIsLoading(false);
      return () => {};
    }
    getQuarantineCounter();
  }, []);

  const onFinishQuarantinePressed = () => {
    Alert.alert(
      'Are you sure you want to finish your quarantine?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: async () => {
            await removeFromStorage("quarantineStartDate");
            await removeFromStorage("quarantineDurationInDays");
            navigation.navigate("DateSelector");
            navigation.reset({
              index: 0,
              routes: [{ name: 'DateSelector' }],
            });
          }
        },
      ],
      { cancelable: false }
    );

  }

  if (loading) {
    return (
      <View style={AppStyle.container}>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View style={AppStyle.container}>

      <Text style={AppStyle.header}>Your Quarantine Ends In:</Text>
      <CountDown
        until={quarantineCounter}
        size={20}
        digitStyle={styles.digitStyle}
        digitTxtStyle={styles.digitTxtStyle}
      />
      <QuarantineProgress
        quarantineDurationInDays={quarantineDurationInDays}
        quarantineCounter={quarantineCounter}
      />
      <View style={styles.buttonContainer}>

        <Button
          style={AppStyle.defaultButton}
          onPress={onFinishQuarantinePressed}
        >
          Finish My Quarantine
          </Button>
      </View>

    </View>
  );
}

HomeScreen.navigationOptions = {
  headerLeft: null,
  gesturesEnabled: false
};

const styles = StyleSheet.create({
  digitStyle: {
    backgroundColor: '#48BB78'
  },
  digitTxtStyle: {
    color: 'white'
  },
  buttonContainer: {
    ...AppStyle.defaultButtonContainer,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  }
});
