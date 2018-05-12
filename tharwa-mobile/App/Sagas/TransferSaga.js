import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import TransferActions from '../Redux/TransferRedux'
import TharwaTransferActions from '../Redux/TharwaTransferRedux'
import ExternalTransferActions from '../Redux/ExternalTransferRedux'

// attempts to transfert
export function* myAccountTransfer(api, { data }) {

  if (data.from === 'devi_usd') {
    this.methodchange = 'devi_cour_usd'
  }
  else {
    if (data.from === 'devi_eur') {
      this.methodchange = 'devi_cour_eur'
    }
    else {
      this.methodchange = `${data.from}_${data.to}`

    }

  }


  const request = {
    method: this.methodchange,
    amount: data.amount
  }
  const response = yield call(api.myAccountTransfer, request)

  // success?
  if (response.ok) {
    const { commission } = response.data
    yield put(TransferActions.transferSuccess(commission))
  } else {
    yield put(TransferActions.transferFailure(I18n.t('transferDialogMessageError')))
  }
}

export function* tharwaTransfer(api, { data }) {
  const request = Object.assign({}, data)
  request.receiver = Object.assign({}, data.receiver)
  request.receiver.account = `THW${request.receiver.account}DZD`
  const response = yield call(api.tharwaTransfer, request)

  // success?
  if (response.ok) {
    const { commission } = response.data
    yield put(TharwaTransferActions.tharwaTransferSuccess(commission))
  } else {
    yield put(TharwaTransferActions.tharwaTransferFailure(I18n.t('transferDialogMessageError')))
  }
}

export function* externalTransfer(api, { data }) {
  const request = Object.assign({}, data)
  request.receiver = Object.assign({}, data.receiver)
  request.receiver.account = `${request.receiver.bank}${request.receiver.account}DZD`
  const response = yield call(api.externalTransfer, request)

  // success?
  if (response.ok) {
    const { commission } = response.data
    yield put(ExternalTransferActions.externalTransferSuccess(commission))
  } else {
    yield put(ExternalTransferActions.externalTransferFailure(I18n.t('transferDialogMessageError')))
  }
}
