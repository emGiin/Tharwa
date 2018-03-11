import { call, put, select } from 'redux-saga/effects'
import AuthActions from '../redux/AuthRedux'
import PinCodeActions from '../redux/PinCodeRedux'

export function* login(api, { email, password, confirmationMethod }) {
  const body = {
    username: email,
    password: password,
    confirmation_method: confirmationMethod,
    client_id: '1',
    grant_type: "password"
  }

  const response = yield call(api.login, body)

  if (response.ok) {
    yield put(AuthActions.authSuccess())
    yield put(PinCodeActions.savePinCodeToken(response.data.temporary_token))
  } else {
    yield put(AuthActions.authFailure('Email ou mot de passe incorrect!'));
  }
}

// attempts to logout
export function* logout(api) {
  yield call(api.removeAuthToken)
  yield put(AuthActions.logoutSuccess())
}

// loads the login
export function* loadToken(api) {
  const authToken = yield select((state) => state.auth.authToken)
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken)
  }
  yield put(AuthActions.tokenLoadSuccess())
}
