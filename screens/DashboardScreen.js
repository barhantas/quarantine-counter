import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/85320e2ea5424dfaaa75ae62e5c06e61" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
