import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AsyncStorage, StyleSheet, Text, View } from "react-native";

import { writeToStorage, readFromStorage, removeFromStorage } from "../utils/";

export default function Welcome({ navigation, route }) {
  const [loading, setIsLoading] = useState(new Date(1598051730000));
  const [date, setDate] = useState(new Date(1598051730000));
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(true);

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);

    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  useEffect(() => {
    async function getQuarantineStartDate() {
      setIsLoading(true);
      const date = await readFromStorage("quarantineStartDate");
      setIsDateTimePickerVisible(!date);
      setDate(date ? new Date(date) : new Date());
      setIsLoading(false);
    }
    getQuarantineStartDate();
  }, []);

  getEndDateOfQuarantine = () => {
    const now = new Date();
    const calculatedDate = now.setDate(
      now.getDate() + assumingQuarantineDayCount
    );
    return new Date(calculatedDate);
  };

  console.log("isDateTimePickerVisible", isDateTimePickerVisible);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isDateTimePickerVisible && (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          <Text
            style={styles.dummyStyle}
            onPress={async () => {
              await writeToStorage("quarantineStartDate", date);
              setIsDateTimePickerVisible(false);
              navigation.navigate("App");
            }}
          >
            Start My Quarantine !
          </Text>
        </View>
      )}
      {/* <Text
        style={styles.dummyStyle}
        onPress={() => {
          navigation.navigate("App");
        }}
      >
        GO to APP !
      </Text> */}
    </View>
  );
}

Welcome.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  dummyStyle: { marginTop: 60 }
});
