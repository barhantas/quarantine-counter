import * as React from "react";
import i18n from "i18n-js";
import Text from "./Text";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";

export default function DashBoardItem({
  containerStyle,
  headerText,
  headerStyle,
  data,
  dataStyle,
  children,
}) {
  return (
    <View style={styles.wrapper}>
      {children || (
        <View style={[containerStyle, styles.container]}>
          <Text id={headerText} style={[styles.headerStyle, headerStyle]} />
          <Text style={[styles.dataStyle, dataStyle]}>{data}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    margin: "auto",
    width: "100%",
    marginBottom: 5
  },
  dataStyle: {
    fontSize: 45,
    color: Colors.white
  },
  headerStyle: {
    fontSize: 30,
    color: Colors.white
  },
});
