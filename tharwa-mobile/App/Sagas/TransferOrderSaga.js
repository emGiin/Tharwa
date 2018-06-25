import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import TansferOrderActions from '../Redux/TransferOrderRedux'

export function* getOrderHistory(api) {
  const response = yield call(api.getOrderHistory)

  // success? 
  if (response.ok) {
    yield put(TansferOrderActions.transferOrderSuccess(response.data))
  } else {
    yield put(TansferOrderActions.transferOrderFailure(I18n.t('accountFetchError')))
  }
}

export function* sendTransferOrder(api) {
  const response = yield call(api.sendTransferOrder)

  // success? 
  if (response.ok) {
    yield put(TansferOrderActions.newTransferOrderSuccess())
  } else {
    yield put(TansferOrderActions.transferOrderFailure(I18n.t('accountFetchError')))
  }
}

