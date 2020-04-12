import { SEND_PUSH_ENDPOINT } from '../constants/Notification';

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
