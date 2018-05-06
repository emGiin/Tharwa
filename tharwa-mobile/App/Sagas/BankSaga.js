import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import BankActions from '../Redux/BankRedux'

export function* getBanks(api) {
  const response = yield call(api.getBanks)

  // success? 
  if (response.ok) {
    yield put(BankActions.bankSuccess(response.data))
  } else {
    yield put(BankActions.BankFailure(I18n.t('BankFetchError')))
  }
}