import { call, put, select } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import PinCodeActions from '../Redux/PinCodeRedux'

export const selectAuthToken = (state) => state.auth.authToken
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
    // yield put({ type: 'RELOGIN_OK' })
  } else {
    yield put(AuthActions.authFailure('WRONG'))
  }
}

// attempts to logout
export function* logout(api) {
  yield call(api.removeAuthToken)
  // yield put(AccountActions.accountRequest())
  yield put(AuthActions.logoutSuccess())
  yield put({ type: 'RELOGIN_ABORT' })
}

// loads the login
export function* loadToken(api) {
  const authToken = yield select(selectAuthToken)
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken)
  }
  yield put(AuthActions.tokenLoadSuccess())
}
