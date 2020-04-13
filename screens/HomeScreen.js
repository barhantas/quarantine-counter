import React, { useState, useEffect } from 'react';

import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import i18n from 'i18n-js';

import { readFromStorage, removeFromStorage } from '../utils/';
import AppStyle from '../AppStyle';
import IndefiniteQuarantine from '../components/IndefiniteQuarantine';
import Colors from '../constants/Colors';
import DefiniteQuarantine from '../components/DefiniteQuarantine';
import Loading from '../components/Loading';

export default function HomeScreen({ navigation, route }) {
  const [loading, setIsLoading] = useState(false);
  const [quarantineStartDate, setQuarantineStartDate] = useState(new Date());
  const [quarantineDurationInDays, setQuarantineDuration] = useState(0);
  const [quarantineCounter, setQuarantineCounter] = useState(0);

  const [quarantineEndDate, setQuarantineEndDate] = useState(0);

  useEffect(() => {
    let _isMounted = true;
    async function getQuarantineCounter() {
      setIsLoading(true);
      const date = await readFromStorage('quarantineStartDate');
      setQuarantineStartDate(date);
      const duration = await readFromStorage('quarantineDurationInDays');
      setQuarantineDuration(duration);
      if (parseInt(duration) > 0) {
        const quarantineEndDate = moment(date).add(duration, 'days');
        setQuarantineEndDate(quarantineEndDate);

        const countDown = quarantineEndDate.diff(moment(), 'seconds');

        setQuarantineCounter(countDown);
      }
      setIsLoading(false);
      return () => {};
    }
    _isMounted && getQuarantineCounter();

    return () => {
      _isMounted = false;
    };
  }, []);

  const onPressFinishQuarantine = () => {
    Alert.alert(
      i18n.t('confirmationFinishQuarantine'),
      '',
      [
        {
          text: i18n.t('labelCancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: i18n.t('labelYes'),
          onPress: async () => {
            await removeFromStorage('quarantineStartDate');
            await removeFromStorage('quarantineDurationInDays');
            navigation.reset({
              index: 0,
              routes: [{ name: 'DateSelector' }],
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {quarantineDurationInDays > 0 ? (
        <DefiniteQuarantine
          quarantineCounter={quarantineCounter}
          quarantineDurationInDays={quarantineDurationInDays}
          onPressFinishQuarantine={onPressFinishQuarantine}
        />
      ) : (
        <IndefiniteQuarantine
          timeLabels={{
            d: 'labelDay',
            h: 'labelHour',
            m: 'labelMinute',
            s: 'labelSecond',
          }}
          size={20}
          digitStyle={styles.digitStyle}
          digitTxtStyle={styles.digitTxtStyle}
          startDate={quarantineStartDate}
          onPressFinishQuarantine={onPressFinishQuarantine}
        />
      )}
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  headerLeft: null,
  gesturesEnabled: false,
};

const styles = StyleSheet.create({
  digitStyle: {
    backgroundColor: Colors.green500,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  digitTxtStyle: {
    color: 'white',
  },
  buttonContainer: {
    ...AppStyle.defaultButtonContainer,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
