import PushNotification from 'react-native-push-notification'
import { PUSHER_APP_KEY } from '../Config/AppConfig';

export const configurePushNotifcation = () =>
  PushNotification.configure({
    onRegister: token => {
      console.log('TOKEN:', token);
    },
    onNotification: notification => {
      console.log('NOTIFICATION:', notification);
    },
    senderID: PUSHER_APP_KEY,
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true,
  });