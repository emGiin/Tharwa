import { all, takeLatest } from 'redux-saga/effects'
import AuthAPI from '../services/AuthApi'
import FixtureAPI from '../services/FixtureAPI'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */
import { AuthTypes } from '../redux/AuthRedux'
import { PinCodeTypes } from '../redux/PinCodeRedux'

/* ------------- Sagas ------------- */
import { login, logout, loadToken } from './AuthSaga'
import { confirmPinCode } from './PinCodeSaga'

/* ------------- API ------------- */
const api = DebugConfig.useFixtures ? FixtureAPI : AuthAPI.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    takeLatest(AuthTypes.TOKEN_LOAD, loadToken, api),

    takeLatest(AuthTypes.AUTH_REQUEST, login, api),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(PinCodeTypes.PIN_CODE_REQUEST, confirmPinCode, api),
  ])
}
