import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { writeToStorage } from './utils';
import { STORAGE_KEY_PUSH_TOKEN } from './constants/Storage';
import { useAppContext } from './AppContext';

export const PushNotification = () => {
  const { token, hasToken, setToken } = useAppContext();

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      receivedToken = await Notifications.getExpoPushTokenAsync();
      // set token of parent context
      setToken(receivedToken);
      // without async, no need to wait promise
      // app logic will handle here with Context API
      writeToStorage(STORAGE_KEY_PUSH_TOKEN, token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  useEffect(() => {
    hasToken || registerForPushNotificationsAsync();
  }, []);

  return null;
};
