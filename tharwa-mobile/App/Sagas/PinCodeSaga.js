import { call, put, select } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import PinCodeActions from '../Redux/PinCodeRedux'
import AuthActions from '../Redux/AuthRedux'

export const selectPinCodeToken = (state) => state.pinCode.pinCodeToken

// loads the login
export function* confirmPinCode(api, { pinCode }) {
  const token = yield select(selectPinCodeToken)
  const response = yield call(api.confirmPinCode, {
    pin_code: pinCode,
    temporary_token: token
  })

  // success?
  if (response.ok) {
    yield put(PinCodeActions.pinCodeSuccess())
    yield put(AuthActions.saveAuthToken(response.data.token_))
  } else {
    yield put(PinCodeActions.pinCodeFailure(I18n.t('pinCodeDescriptionErreur')))
  }
}