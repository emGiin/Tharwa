import { call, put, select } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import SignupActions from '../Redux/SignupRedux'

// attempts to login
export function* signup(api, data) {
  data.type = data.type_
  delete data.type_
  const response = yield call(api.signup, data)
  // success?
  if (!response.ok) {
    yield put(SignupActions.signupSuccess())
  } else {
    yield put(SignupActions.signupFailure(I18n.t('dialogErrorMessage')))
  }
}