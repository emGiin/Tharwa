import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import NewOrderActions from '../Redux/NewOrderRedux'


// attempts to transfert


export function* newOrder(api, { data }) {
    const banks= data.receiver.account.substring(0, 3)
  data.receivers.bank = banks
  const response = yield call(api.newOrder, data)

  // success?
  if (response.ok) {
    
    yield put(NewOrderActions.NewOrderSuccess())
  } else {
    yield put(NewOrderActions.NewOrderFailure(I18n.t('transferDialogMessageError')))
  }
}
