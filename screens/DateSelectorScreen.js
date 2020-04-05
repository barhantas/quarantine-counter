import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppStyle from "../AppStyle";

import { StyleSheet, Text, View, Platform, Image } from "react-native";
import Button from "react-native-button";

import moment from "moment";

export default function DateSelectorScreen({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false);

  useEffect(() => {
    return () => {
    }
  }, [])

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set' || event.type === 'dismissed') {
        setDateTimePickerVisible(false);
        console.log(dateTimePickerVisible)
      }
    }

    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={AppStyle.container}>
      <Text style={AppStyle.header}>Choose Start Date</Text>
      {(dateTimePickerVisible || Platform.OS === 'ios') && <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={0}
        maximumDate={new Date()}
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />}

      {Platform.OS === 'android' &&
        <Image
          style={styles.image}
          source={require('../assets/images/date-selector.png')}
        />
      }
      <View style={styles.buttonContainer}>
        {Platform.OS === 'android' && !dateTimePickerVisible &&
          <View style={styles.outlinedButtonContainer}>
            <Button
              style={AppStyle.outlinedButton}
              onPress={() => {
                setDateTimePickerVisible(true);
              }}
            >
              {moment(date).format('LL')}
            </Button>
          </View>
        }

        <Button
          style={styles.button}
          onPress={async () => {
            navigation.navigate("TimeSelector", {
              selectedStartDate: JSON.stringify(date)
            });
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
  button: {
    ...AppStyle.defaultButton,

  },
  outlinedButtonContainer: {
    marginBottom: 20
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  },
  buttonContainer: {
    ...AppStyle.defaultButtonContainer,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  }
});
