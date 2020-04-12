import { SEND_PUSH_ENDPOINT } from '../constants/Notification';
import { Notifications } from 'expo';

export const sendPushNotification = async ({
  pushToken,
  title = 'Original Title',
  body = 'And here is the body',
  data = { data: 'goes here' },
}) => {
  const message = {
    to: pushToken,
    sound: 'default',
    title,
    body,
    data,
    _displayInForeground: true,
  };

  await fetch(SEND_PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

export const scheduleNotificationToEndDate = (date) => {
  const options = { time: date };

  const notification = {
    title: 'QUARANTINE_END_PUSH_TITLE',
    body: 'QUARANTINE_END_PUSH_BODY',
  };

  Notifications.scheduleLocalNotificationAsync(notification, options);
};
