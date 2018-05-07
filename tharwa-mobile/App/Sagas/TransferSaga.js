import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import TransferActions from '../Redux/TransferRedux'

// attempts to transfert
export function* myAccountTransfer(api, { data }) {

  if (data.from === 'devi_usd') {
    methodchange = 'devi_cour_usd'
  }
  else {
    if (data.from === 'devi_eur') {
      methodchange = 'devi_cour_eur'
    }
    else {
      methodchange = `${data.from}_${data.to}`

    }

  }


  const request = {
    method: methodchange,
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
    yield put(TransferActions.transferSuccess(commission))
  } else {
    yield put(TransferActions.transferFailure(I18n.t('transferDialogMessageError')))
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
    yield put(TransferActions.transferSuccess(commission))
  } else {
    yield put(TransferActions.transferFailure(I18n.t('transferDialogMessageError')))
  }
}
