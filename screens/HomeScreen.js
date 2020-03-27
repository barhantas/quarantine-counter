import React, { useState, useEffect } from "react";

import { AsyncStorage, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [assumingQuarantineDayCount, setAssumingQuarantineDayCount] = useState(
    0
  );

  setInitValueToState = async () => {
    const assumingQuarantineDayCountInLocalStorage = await AsyncStorage.getItem(
      "assumingQuarantineDayCount"
    );

    setAssumingQuarantineDayCount(
      parseInt(assumingQuarantineDayCountInLocalStorage) - 1
    );
  };

  updateStorage = async () => {
    if (isNaN(assumingQuarantineDayCount)) {
      await AsyncStorage.setItem("assumingQuarantineDayCount", "1");
    } else {
      await AsyncStorage.setItem(
        "assumingQuarantineDayCount",
        (assumingQuarantineDayCount + 1).toString()
      );
    }
  };

  useEffect(() => {
    setInitValueToState();
  }, []);

  useEffect(() => {
    updateStorage();
  }, [assumingQuarantineDayCount]);

  getEndDateOfQuarantine = () => {
    const now = new Date();
    const calculatedDate = now.setDate(now.getDate() + assumingQuarantineDayCount);
    return new Date(calculatedDate)
  };

  return (
    <View style={styles.container}>
      <Text>Sayaç ! </Text>
      <Text>{`assumingQuarantineDayCount : ${assumingQuarantineDayCount ||
        "not set yet :("}`}</Text>

      <Text
        style={styles.dummyStyle}
        onPress={() => {
          setAssumingQuarantineDayCount(assumingQuarantineDayCount + 1);
        }}
      >
        Add 1 Day to My Quarantine !
      </Text>

      <Text style={styles.dummyStyle}>
        {`Your Quarantine gonna finis on ${this.getEndDateOfQuarantine()} !`}
      </Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  dummyStyle: { marginTop: 60 }
});
