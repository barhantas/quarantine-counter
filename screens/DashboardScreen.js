import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { getFromCollectApi } from "../utils";
import AppStyle from "../AppStyle";
import Colors from "../constants/Colors";
import DashBoardItem from "../components/DashBoardItem";

export default function DashboardScreen() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    async function getCovidData() {
      try {
        // possible endpoints:
        // /countriesData
        // /totalData
        // /coronaNews
        const data = await getFromCollectApi("corona/totalData");
        setCovidData(data.result);
        console.log(data.result);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    getCovidData();
    return () => {};
  }, []);
  if (!isLoadingComplete) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <DashBoardItem
        headerText={"Total Cases"}
        data={covidData.totalCases}
        headerStyle={styles.totalCasesHeader}
        containerStyle={styles.totalCasesContainer}
      />
      <DashBoardItem
        headerText={"Total Deaths"}
        data={covidData.totalDeaths}
        containerStyle={styles.totalDeathsContainer}
      />
      <DashBoardItem
        headerText={"Total Recovered"}
        data={covidData.totalRecovered}
        containerStyle={styles.totalRecoveredContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...AppStyle.container,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  totalCasesHeader: {},
  totalCasesContainer: {
    backgroundColor: Colors.red600,
    borderColor: Colors.red600,
  },
  totalDeathsContainer: {
    backgroundColor: Colors.grey600,
    borderColor: Colors.grey600
  },
  totalRecoveredContainer: {
    backgroundColor: Colors.green600,
    borderColor: Colors.green600
  }
});
