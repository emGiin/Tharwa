import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import UnlockAccountActions from '../Redux/UnlockAccountRedux'

// attempts to login
export function* unlockAccount(api, { data }) {
  // numero, justification
  const response = yield call(api.unlockAccount, data)
  console.warn(data);

  // success?
  if (response.ok) {
    yield put(UnlockAccountActions.unlockAccountSuccess())
  } else {
    yield put(UnlockAccountActions.unlockAccountFailure(I18n.t('dialogErrorMessage')))
  }
}