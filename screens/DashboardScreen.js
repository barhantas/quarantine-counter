import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { getFromCollectApi } from "../utils";
import AppStyle from "../AppStyle";
import Colors from "../constants/Colors";
import DashBoardItem from "../components/DashBoardItem";
import Loading from "../components/Loading";

export default function DashboardScreen() {
  const [isLoading, setLoading] = useState(false);
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    async function getCovidData() {
      try {
        // possible endpoints:
        // /countriesData
        // /totalData
        // /coronaNews
        setLoading(true);
        const data = await getFromCollectApi("corona/totalData");
        setCovidData(data.result);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    getCovidData();
    return () => {};
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <DashBoardItem
        headerText={"labelTotalCases"}
        data={covidData.totalCases}
        headerStyle={styles.totalCasesHeader}
        containerStyle={styles.totalCasesContainer}
      />
      <DashBoardItem
        headerText={"labelTotalDeaths"}
        data={covidData.totalDeaths}
        containerStyle={styles.totalDeathsContainer}
      />
      <DashBoardItem
        headerText={"labelTotalRecovered"}
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
    backgroundColor: Colors.grey800,
    borderColor: Colors.grey800
  },
  totalRecoveredContainer: {
    backgroundColor: Colors.green600,
    borderColor: Colors.green600
  }
});
