import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import ExchangeRateActions from '../Redux/ExchangeRateRedux'

export function* getExchangeRates(api) {
  const response = yield call(api.getExchangeRates)

  // success? 
  if (response.ok) {
    yield put(ExchangeRateActions.ExchangeRateSuccess(response.data))
  } else {
    yield put(ExchangeRateActions.ExchangeRateFailure(I18n.t('EchangeRateFetchError')))
  }
}