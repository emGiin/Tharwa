import PushNotification from 'react-native-push-notification'

export const pushNotify = (title, message, color = "green") => {
  PushNotification.localNotification({
    ticker: "Tharwa Notification Ticker",
    autoCancel: true,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    bigText: message,
    subText: "Notification",
    color,
    vibrate: true,
    vibration: 300,
    group: "tharwa",
    ongoing: false,
    title,
    message,
    playSound: true,
    soundName: 'default'
  });
}