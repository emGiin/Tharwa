import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import ExchangeRateActions from '../Redux/ExchangeRateRedux'

export function* getExchangeRates(api) {
  const response = yield call(api.getExchangeRates)

  // success? 
  if (response.ok) {
    const rates = []
    Object.entries(response.data).forEach(([key, value]) => {
      const [from, to] = key.split('_')
      rates.push({ from, to, value: value.toFixed(4) })
    })

    yield put(ExchangeRateActions.exchangeRateSuccess(rates))
  } else {
    yield put(ExchangeRateActions.exchangeRateFailure(I18n.t('EchangeRateFetchError')))
  }
}