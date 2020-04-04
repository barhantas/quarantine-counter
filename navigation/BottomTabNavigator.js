import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import TasksScreen from "../screens/TasksScreen";
import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route)});
  const options = {
    activeTintColor: Colors.green500
  }

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={options}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Counter",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="calculator" />
          )
        }}
      />
      <BottomTab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          title: "Tasks",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="rocket1" />
          )
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
      return "Counter";
    case "Tasks":
      return "Daily Tasks";
  }
}
