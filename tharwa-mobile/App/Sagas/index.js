import { all, takeLatest } from 'redux-saga/effects'
import AuthAPI from '../Services/AuthApi'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { PinCodeTypes } from '../Redux/PinCodeRedux'
import { SignupTypes } from '../Redux/SignupRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { TransferTypes } from '../Redux/TransferRedux'
import { TharwaTransferTypes } from '../Redux/TharwaTransferRedux'
import { ExternalTransferTypes } from '../Redux/ExternalTransferRedux'
import { BankTypes } from '../Redux/BankRedux'
import { ExchangeRateTypes } from '../Redux/ExchangeRateRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout, loadToken } from './AuthSaga'
import { confirmPinCode } from './PinCodeSaga'
import { signup } from './SignupSaga'
import { getProfile, requestNewAccount } from './AccountSaga'
import {
  myAccountTransfer,
  tharwaTransfer,
  externalTransfer
} from './TransferSaga'
import { getBanks } from './BankSaga'
import { getExchangeRates } from './ExchangeRateSaga'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const authApi = DebugConfig.useFixtures ? FixtureAPI : AuthAPI.create()
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
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
    takeLatest(PinCodeTypes.PIN_CODE_REQUEST, confirmPinCode, { authApi, api }),

    // registration
    takeLatest(SignupTypes.SIGNUP_REQUEST, signup, api),

    // account
    takeLatest(AccountTypes.ACCOUNT_REQUEST, getProfile, api),
    takeLatest(AccountTypes.NEW_ACCOUNT_REQUEST, requestNewAccount, api),

    // banks
    takeLatest(BankTypes.BANK_REQUEST, getBanks, api),

    // money transfer
    takeLatest(TransferTypes.TRANSFER_REQUEST, myAccountTransfer, api),
    takeLatest(TharwaTransferTypes.THARWA_TRANSFER_REQUEST, tharwaTransfer, api),
    takeLatest(ExternalTransferTypes.EXTERNAL_TRANSFER_REQUEST, externalTransfer, api),

    // Exchange Rate
    takeLatest(ExchangeRateTypes.EXCHANGE_RATE_REQUEST, getExchangeRates, api)

    // // password update
    // takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
  ])
}
