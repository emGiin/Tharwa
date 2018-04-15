import { all, takeLatest } from 'redux-saga/effects'
import AuthAPI from '../services/AuthAPI'
import BanquierAPI from '../services/createBanquier'
import FixtureAPI from '../services/FixtureAPI'
import {useFixtures} from '../config/DebugConfig'

/* ------------- Types ------------- */
import { AuthTypes } from '../redux/AuthRedux'
import { PinCodeTypes } from '../redux/PinCodeRedux'
import { newBanquierTypes } from '../redux/banquierRedux'

/* ------------- Sagas ------------- */
import { login, logout, loadToken } from './AuthSaga'
import { confirmPinCode } from './PinCodeSaga'
import { register } from './banquierSagas'

/* ------------- API ------------- */
const api = useFixtures ? FixtureAPI : AuthAPI.create()
const api_b = useFixtures ? FixtureAPI : BanquierAPI.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    takeLatest(AuthTypes.TOKEN_LOAD, loadToken, api),
    takeLatest(AuthTypes.AUTH_REQUEST, login, api),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(PinCodeTypes.PIN_CODE_REQUEST, confirmPinCode, api),
    takeLatest(newBanquierTypes.CREATE_BANQUIER, register, api_b),
  ])
}
