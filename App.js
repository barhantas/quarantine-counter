import React, { useEffect } from 'react';
import { AppState, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import DateSelectorScreen from './screens/DateSelectorScreen';
import TimeSelectorScreen from './screens/TimeSelectorScreen';
import AppStyle from './AppStyle';
import { PushNotification } from './PushNotification';
import { readFromStorage } from './utils';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import AppTranslation from './AppTranslation';
import { AppContext } from './AppContext';

const Stack = createStackNavigator();

i18n.translations = AppTranslation;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function App(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [date, setDate] = React.useState();

  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  handleAppStateChange = (nextAppState) => {
    console.log('nextAppState', nextAppState);
    if (nextAppState === 'inactive') {
      // console.log("the app is closed");
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
        setDate(await readFromStorage('quarantineStartDate'));
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setIsLoading(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  if (!isLoading && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <AppContext>
        <PushNotification />
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator initialRouteName={date ? 'App' : 'DateSelector'}>
              <Stack.Screen
                name="DateSelector"
                component={DateSelectorScreen}
                options={{
                  title: i18n.t('screenTitleQuarantineTimer'),
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="TimeSelector"
                component={TimeSelectorScreen}
                options={{
                  title: i18n.t('screenTitleQuarantineTimer'),
                  headerBackTitle: i18n.t('labelBack'),
                }}
              />
              <Stack.Screen name="App" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AppContext>
    );
  }
}

const styles = StyleSheet.create({
  container: AppStyle.container,
});
