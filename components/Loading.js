import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import AppStyle from "../AppStyle";

export default function Loading({ style, ...props }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.green500} {...props}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...AppStyle.container,
    justifyContent: "center",
  },
});
