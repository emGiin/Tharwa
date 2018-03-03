import { all, takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, confirmPinCode, logout, loadToken } from './AuthSaga'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // load token
    takeLatest(AuthTypes.TOKEN_LOAD, loadToken, api),

    // authentication
    takeLatest(AuthTypes.AUTH_REQUEST, login, api),
    takeLatest(AuthTypes.PIN_CODE_REQUEST, confirmPinCode, api),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout, api),

    // // registration
    // takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),

    // // password update
    // takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
  ])
}
