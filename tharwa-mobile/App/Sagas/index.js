import { all, takeLatest } from 'redux-saga/effects'
import AuthAPI from '../Services/AuthApi'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { PinCodeTypes } from '../Redux/PinCodeRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout, loadToken } from './AuthSaga'
import { confirmPinCode } from './PinCodeSaga'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const authApi = AuthAPI.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // load token
    takeLatest(AuthTypes.TOKEN_LOAD, loadToken, authApi),

    // authentication
    takeLatest(AuthTypes.AUTH_REQUEST, login, authApi),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout, authApi),

    // Pin Code
    takeLatest(PinCodeTypes.PIN_CODE_REQUEST, confirmPinCode, authApi),

    // // registration
    // takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),

    // // password update
    // takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
  ])
}
