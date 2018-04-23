import { all, takeLatest } from 'redux-saga/effects'
import AuthAPI from '../services/AuthAPI'
import FixtureAPI from '../services/FixtureAPI'
import appAPI from '../services/appAPI'
import {useFixtures} from '../config/DebugConfig'

/* ------------- Types ------------- */
import { AuthTypes } from '../redux/AuthRedux'
import { PinCodeTypes } from '../redux/PinCodeRedux'
import { ConfirmInscriptionTypes } from '../redux/ConfirmInscriptionRedux'
import { ValidateTransferTypes} from '../redux/ValidateTransferRedux'

/* ------------- Sagas ------------- */
import { login, logout, loadToken } from './AuthSaga'
import { confirmPinCode } from './PinCodeSaga'
import { getRequestsList, acceptDemand, rejectDemand } from './ConfirmInscriptionSaga'
import { getTransfersList, acceptTransfer, rejectTransfer } from './ValidateTransferSaga'

/* ------------- API ------------- */
const api = useFixtures ? FixtureAPI : AuthAPI.create()
const api_= useFixtures ? FixtureAPI : appAPI.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    takeLatest(AuthTypes.TOKEN_LOAD, loadToken, api),

    takeLatest(AuthTypes.AUTH_REQUEST, login, api),
    
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(PinCodeTypes.PIN_CODE_REQUEST, confirmPinCode, api),

    takeLatest(ConfirmInscriptionTypes.DATASET_REQUEST,getRequestsList , api_),

    takeLatest(ConfirmInscriptionTypes.ACCEPT_DEMAND,acceptDemand , api_),
    
    takeLatest(ConfirmInscriptionTypes.REJECT_DEMAND,rejectDemand , api_),

    takeLatest(ValidateTransferTypes.REJECT_DEMAND,rejectTransfer , api_),

    takeLatest(ValidateTransferTypes.ACCEPT_DEMAND,acceptTransfer , api_),

    takeLatest(ValidateTransferTypes.DATASET_REQUEST,getTransfersList , api_),
  ])
}