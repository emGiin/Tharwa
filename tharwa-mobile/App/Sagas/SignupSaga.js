import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import SignupActions from '../Redux/SignupRedux'

// attempts to login
export function* signup(api, { user }) {
  const response = yield call(api.signup, user)

  // success?
  if (response.ok) {
    yield put(SignupActions.signupSuccess())
  } else {
    yield put(SignupActions.signupFailure(I18n.t('dialogErrorMessage')))
  }
}