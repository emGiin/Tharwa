import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import TransferActions from '../Redux/TransferRedux'

// attempts to transfert
export function* myAccountTransfer(api, data) {
  const response = yield call(api.myAccountTransfer, data)

  // success?
  if (response.ok) {
    yield put(TransferActions.transferSuccess())
  } else {
    yield put(TransferActions.transferFailure(I18n.t('transferDialogDescriptionErreur')))
  }
}

export function* tharwaTransfer(api, { data }) {
  const response = yield call(api.tharwaTransfer, data)

  // success?
  if (response.ok) {
    yield put(TransferActions.transferSuccess())
  } else {
    yield put(TransferActions.transferFailure(I18n.t('transferDialogDescriptionErreur')))
  }
}

