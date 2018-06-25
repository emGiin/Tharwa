import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import TansferOrderActions from '../Redux/TransferOrderRedux'

export function* getOrderHistory(api) {
  const response = yield call(api.getOrderHistory)

  // success? 
  if (response.ok) {
    yield put(TansferOrderActions.transferOrderSuccess(response.data))
  } else {
    yield put(TansferOrderActions.transferOrderFailure(I18n.t('orderTransferDialogMessageError')))
  }
}

export function* sendTransferOrder(api, { data }) {
  const response = yield call(api.sendTransferOrder, data)
  console.warn(response);

  // success? 
  if (response.ok) {
    yield put(TansferOrderActions.newTransferOrderSuccess())
  } else {
    yield put(TansferOrderActions.transferOrderFailure(I18n.t('orderTransferDialogMessageError')))
  }
}

