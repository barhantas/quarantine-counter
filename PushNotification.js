import React, { useState, useEffect } from 'react';
import { Text, View, Button, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { writeToStorage } from './utils';
import { STORAGE_KEY_PUSH_TOKEN } from './constants/Storage';
import { sendPushNotification } from './utils/notification';
import { useAppContext } from './AppContext';

export const PushNotification = () => {
  const [notification, setNotification] = useState({});
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

  const handleNotification = (notification) => {
    Vibration.vibrate();
    console.log(notification);
    setNotification(notification);
  };

  useEffect(() => {
    hasToken || registerForPushNotificationsAsync();

    /*
     * Sample notification handling mechanism.
     * add listener to listen received notification.
     */
    Notifications.addListener(handleNotification);
  }, []);

  const testSendNotification = () => {
    sendPushNotification({pushToken: token});
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Origin: {notification.origin}</Text>
        <Text>Data: {JSON.stringify(notification.data)}</Text>
      </View>
      <Button title={'Press to Send Notification'} onPress={() => testSendNotification()} />
    </View>
  );
};
