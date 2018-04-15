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

    takeLatest(ConfirmInscriptionTypes.REQ_LIST_REQUEST,getRequestsList , api_),

    takeLatest(ConfirmInscriptionTypes.VALIDATE_REQUEST,acceptDemand , api_),
    
    takeLatest(ConfirmInscriptionTypes.REJECT_REQUEST,rejectDemand , api_),

    takeLatest(ValidateTransferTypes.REJECT_TRANSFER,rejectTransfer , api_),

    takeLatest(ValidateTransferTypes.VALIDATE_TRANSFER,acceptTransfer , api_),

    takeLatest(ValidateTransferTypes.TRANS_LIST_REQUEST,getTransfersList , api_),
  ])
}
