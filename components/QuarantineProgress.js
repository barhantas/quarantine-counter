import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import AppStyle from "../AppStyle";
import Colors from "../constants/Colors";

export function QuarantineProgress({
  quarantineDurationInDays,
  quarantineCounter,
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  if (!quarantineCounter) {
    return <Text>Loading...</Text>;
  }

  const totalTimeInSeconds = quarantineDurationInDays * 24 * 60 * 60;

  const progress =
    ((totalTimeInSeconds - quarantineCounter + seconds) / totalTimeInSeconds) *
    100;

  const progressText = `%${progress.toFixed(4)}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quarantine Progress</Text>
      <AnimatedCircularProgress
        size={200}
        width={32}
        fill={progress}
        tintColor={Colors.green500}
        backgroundColor={Colors.grey100}
        rotation={270}
        //Add something fun
        onAnimationComplete={() => console.log("onAnimationComplete")}
      >
        {(fill) => <Text style={styles.progressText}>{progressText}</Text>}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  title: { ...AppStyle.header },
  progressText: {},
});
