import React, { useState } from 'react';
import { StyleSheet, View, Picker, Platform, Image, Switch } from 'react-native';
import Button from 'react-native-button';
import moment from 'moment';
import i18n from 'i18n-js';

import { writeToStorage, utilizeStartDate, scheduleNotificationToEndDate } from '../utils';

import { TASKS_TR } from '../constants/Tasks_TR';
import { TASKS_EN } from '../constants/Tasks_EN';

import AppStyle from '../AppStyle';
import Colors from '../constants/Colors';
import Text from '../components/Text';

export default function TimeSelectorScreen({
  navigation,
  route: { params: { selectedStartDate } } = {},
}) {
  const [day, setDay] = useState('14');
  const [isIndefinite, setIsIndefinite] = useState(false);
  const days = [];

  for (var i = 1; i <= 30; i++) {
    days.push(i);
  }

  const localTasks = i18n.locale === 'tr-TR' ? TASKS_TR : TASKS_EN;

  return (
    <View style={styles.container}>
      <Text id={'titleChooseDuration'} style={styles.header} />
      {Platform.OS === 'android' && (
        <Image style={styles.image} source={require('../assets/images/time-selector.png')} />
      )}
      <View style={Platform.OS === 'android' ? styles.buttonContainer : { flex: 1 }}>
        <View style={styles.switchWrapper}>
          <Text style={styles.switchText} id={'labelIndefiniteDuration'} />
          <Switch
            style={styles.switchStyle}
            value={isIndefinite}
            onValueChange={(v) => {
              setIsIndefinite(v);
              setDay(0);
            }}
          />
        </View>
        {!isIndefinite && (
          <View style={Platform.OS === 'android' && styles.pickerWrapper}>
            <Picker
              selectedValue={day}
              onValueChange={(val) => {
                setDay(val);
              }}
              style={Platform.OS === 'android' && styles.picker}
              prompt="Duration"
            >
              {days.map((item, index) => {
                return <Picker.Item label={item.toString()} value={item.toString()} key={item} />;
              })}
            </Picker>
          </View>
        )}

        <View style={Platform.OS === 'ios' && styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={async () => {
              const date = utilizeStartDate(JSON.parse(selectedStartDate));

              await writeToStorage('quarantineDurationInDays', day);
              await writeToStorage(
                'quarantineStartDate',
                date,
              );
              const endDate = moment(date).add(day, 'days').toDate();
              scheduleNotificationToEndDate(endDate);
              await writeToStorage('tasks', localTasks.slice(0, day > 0 ? day : 30));
              navigation.reset({
                index: 0,
                routes: [{ name: 'App' }],
              });
            }}
          >
            {i18n.t('labelStart')}
          </Button>
        </View>
      </View>
    </View>
  );
}

TimeSelectorScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};

const styles = StyleSheet.create({
  container: {
    ...AppStyle.container,
  },
  picker: {
    width: 300,
    color: Colors.green500,
  },
  switchWrapper: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Platform.OS === 'ios' ? 30 : 0,
  },
  switchStyle: {
    alignSelf: 'flex-end',
  },
  switchText: {
    fontSize: 20,
    color: Colors.green500,
  },
  pickerWrapper: {
    ...AppStyle.outlinedButton,
    padding: 0,
    marginBottom: 20,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  header: {
    ...AppStyle.header,
  },
  dummyStyle: { marginTop: 60 },
  button: {
    ...AppStyle.defaultButton,
  },
  buttonContainer: {
    ...AppStyle.defaultButtonContainer,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
