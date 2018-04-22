import { call, put, select } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import AuthActions from '../Redux/AuthRedux'
import PinCodeActions from '../Redux/PinCodeRedux'

export const selectAuthToken = (state) => state.auth.authToken
export const selectPinCode = (state) => state.pin.code
// attempts to login
export function* login(api, { email, password, confirmationMethod }) {
  const authObj = {
    username: email,
    password: password,
    confirmation_method: confirmationMethod,
    client_id: '2',
    grant_type: "password"
  }

  const response = yield call(api.login, authObj)

  // success?
  if (response.ok) {
    yield put(AuthActions.authSuccess())
    yield put(PinCodeActions.savePinCodeToken(response.data.temporary_token))
  } else {
    yield put(AuthActions.authFailure(I18n.t('authDialogDescriptionErreur')))
  }
}

// attempts to logout
export function* logout(api) {
  yield call(api.removeAuthHeaders)
  yield put(AuthActions.logoutSuccess())
}

// loads the login
export function* loadToken(api) {
  const authToken = yield select(selectAuthToken)
  const pinCode = yield select(selectPinCode)
  // only set the token if we have it
  if (authToken && pinCode) {
    yield call(api.setAuthHeaders, pinCode, authToken)
  }
  yield put(AuthActions.tokenLoadSuccess())
}
