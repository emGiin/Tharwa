import { call, put, select } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'

export const selectPinCodeToken = (state) => state.auth.pinCodeToken
export const selectAuthToken = (state) => state.auth.authToken
// attempts to login
export function* login(api, { email, password, confirmationMethod }) {
  const authObj = { email, password, confirmationMethod }

  const response = yield call(api.login, authObj)

  // success?
  if (response.ok) {
    yield put(AuthActions.authSuccess(response.data.token))
    // yield put({ type: 'RELOGIN_OK' })
  } else {
    yield put(AuthActions.authFailure('WRONG'))
  }
}

// loads the login
export function* confirmPinCode(api) {
  const token = yield select(selectPinCodeToken)
  // only set the token if we have it
  if (token) {
    yield call(api.setAuthToken, token)
  }
  yield put(AuthActions.tokenLoadSuccess())
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
