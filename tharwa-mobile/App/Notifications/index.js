import Pusher from 'pusher-js/react-native';
import { PUSHER_APP_KEY } from '../Config/AppConfig'
import { configurePushNotifcation } from './PushConfig'
import { pushNotify } from './LocalNotification'
import { store } from '../Containers/App'

// Actions
import AccountActions from '../Redux/AccountRedux'


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


export const initPusher = email => {
  const pusher = new Pusher(PUSHER_APP_KEY, {
    cluster: 'eu',
    encrypted: true
  });

  const channel = pusher.subscribe(`${CHANNEL_ID}.${email}`);

  for (const eventName in events) {
    if (events.hasOwnProperty(eventName)) {
      channel.bind(events[eventName], data => {
        pushNotify(notificationTitles[events[eventName]], data.message)
        store.dispatch(AccountActions.accountRequest())
      });
    }
  }
  configurePushNotifcation()
}