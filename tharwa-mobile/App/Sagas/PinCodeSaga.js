import { call, put, select } from 'redux-saga/effects'
import PinCodeActions from '../Redux/PinCodeRedux'
import AuthActions from '../Redux/AuthRedux'

export const selectPinCodeToken = (state) => state.pinCode.pinCodeToken

// loads the login
export function* confirmPinCode(api, { pinCode }) {
  const token = yield select(selectPinCodeToken)
  const response = yield call(api.confirmPinCode, { pinCode, token })

  // success?
  if (response.ok) {
    yield put(PinCodeActions.pinCodeSuccess())
    yield put(AuthActions.saveAuthToken(response.data.token))
  } else {
    yield put(PinCodeActions.pinCodeFailure('WRONG'))
  }
}