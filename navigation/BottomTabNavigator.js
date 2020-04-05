import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import i18n from "i18n-js";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import TasksScreen from "../screens/TasksScreen";
import DashboardScreen from "../screens/DashboardScreen";

import HomeIcon from "../icons/HomeIcon";

import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: i18.t(getHeaderTitle(route)) });
  const options = {
    activeTintColor: Colors.green500,
  };

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={options}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: i18n.t("bottomMenuTitleHome"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          title: i18n.t("bottomMenuTitleTasks"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="rocket1" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="areachart" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "screenTitleCounter";
    case "Tasks":
      return "screenTitleTasks";
    case "Dashboard":
      return "screenTitleDashboard";
  }
}
