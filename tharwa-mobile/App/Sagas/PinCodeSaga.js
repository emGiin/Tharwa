import { call, put, select } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import PinCodeActions from '../Redux/PinCodeRedux'
import AuthActions from '../Redux/AuthRedux'
import AccountActions from '../Redux/AccountRedux'

export const selectPinCodeToken = (state) => state.pinCode.token

// loads the login
export function* confirmPinCode({ authApi, api }, { pinCode }) {
  const token = yield select(selectPinCodeToken)
  const response = yield call(authApi.confirmPinCode, {
    pin: pinCode,
    temporary_token: token
  })

  // success? 
  if (response.ok) {
    yield put(PinCodeActions.pinCodeSuccess())
    yield put(AuthActions.saveAuthToken(response.data.token_))
    yield put(AccountActions.saveAccountType(response.data.client_type))
    yield call(api.setAuthHeaders, pinCode, response.data.token_)
  } else {
    yield put(PinCodeActions.pinCodeFailure(I18n.t('pinCodeDescriptionErreur')))
  }
}