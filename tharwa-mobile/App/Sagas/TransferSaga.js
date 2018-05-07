import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import TransferActions from '../Redux/TransferRedux'

// attempts to transfert
export function* myAccountTransfer(api, { data }) {

  if(data.from === 'devi_usd')
  {
    methodchange='devi_cour_usd'
  }
  else{
    if(data.from === 'devi_eur')
    {
      methodchange='devi_cour_eur'
    }
    else{
      methodchange= `${data.from}_${data.to}`

    }

  }
 
 
  const request = {
    method:  methodchange,
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
  if (data.receiver && data.receiver.account)
    data.receiver.account = `THW${data.receiver.account}DZD`
  const response = yield call(api.tharwaTransfer, data)

  // success?
  if (response.ok) {
    const { commission } = response.data
    yield put(TransferActions.transferSuccess(commission))
  } else {
    yield put(TransferActions.transferFailure(I18n.t('transferDialogMessageError')))
  }
}

export function* externalTransfer(api, { data }) {
  if (data.receiver && data.receiver.account)
    data.receiver.account = `${data.bank}${data.receiver.account}DZD`
  const response = yield call(api.externalTransfer, data)

  // success?
  if (response.ok) {
    const { commission } = response.data
    yield put(TransferActions.transferSuccess(commission))
  } else {
    yield put(TransferActions.transferFailure(I18n.t('transferDialogMessageError')))
  }
}
