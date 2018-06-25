import Pusher from 'pusher-js/react-native';
import { PUSHER_APP_KEY } from '../Config/AppConfig'
import { configurePushNotifcation } from './PushConfig'
import { pushNotify } from './LocalNotification'

const CHANNEL_ID = 'tharwa-channel'

const events = {
  ACCEPT_ACCOUNT: 'accept_account',
  TRANSFER_MY_ACCOUNT: 'transfer_my_account',
  TRANSFER_VALIDATION: 'transfer_validation',
  TRANSFER_RECEIVED: 'transfer_received',
  COMMISION: 'commission',
  TRANSFER_ORDRE: 'transfer_ordre'
}
const notificationTitles = {
  accept_account: 'Création de Compte',
  transfer_my_account: 'Virement entre comptes',
  transfer_validation: 'Virement émis',
  transfer_received: 'Virement reçu',
  commission: 'Commission',
  transfer_ordre: 'Ordre de virement'
}


export const initPusher = (email, dispatch) => {
  const pusher = new Pusher(PUSHER_APP_KEY, {
    cluster: 'eu',
    encrypted: true
  });

  const channel = pusher.subscribe(CHANNEL_ID);

  channel.bind(events.ACCEPT_ACCOUNT, data => {
    pushNotify(notificationTitles[events.ACCEPT_ACCOUNT], data.message)
  });

  channel.bind(events.TRANSFER_MY_ACCOUNT, data => {
    pushNotify(notificationTitles[events.TRANSFER_MY_ACCOUNT], data.message)
  });

  channel.bind(events.TRANSFER_VALIDATION, data => {
    pushNotify(notificationTitles[events.TRANSFER_VALIDATION], data.message)
  });

  channel.bind(events.TRANSFER_RECEIVED, data => {
    pushNotify(notificationTitles[events.TRANSFER_RECEIVED], data.message)
  });

  channel.bind(events.COMMISION, data => {
    pushNotify(notificationTitles[events.COMMISION], data.message)
  });

  channel.bind(events.TRANSFER_ORDRE, data => {
    pushNotify(notificationTitles[events.TRANSFER_ORDRE], data.message)
  });

  configurePushNotifcation()
}