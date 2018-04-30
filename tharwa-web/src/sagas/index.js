import { all, takeLatest } from 'redux-saga/effects'
import AuthAPI from '../services/AuthAPI'
import FixtureAPI from '../services/FixtureAPI'
import MainAPI from '../services/MainAPI'
import {useFixtures} from '../config/DebugConfig'

/* ------------- Types ------------- */
import { AuthTypes } from '../redux/AuthRedux'
import { PinCodeTypes } from '../redux/PinCodeRedux'
import { ConfirmInscriptionTypes } from '../redux/ConfirmInscriptionRedux'
import { OtherAccountTypes } from '../redux/OtherAccountRedux'
import { ValidateTransferTypes} from '../redux/ValidateTransferRedux'

/* ------------- Sagas ------------- */
import { login, logout, loadToken } from './AuthSaga'
import { confirmPinCode } from './PinCodeSaga'
import * as confirmInscriptionSaga from './ConfirmInscriptionSaga'
import * as otherAccountSaga from './OtherAccountSaga'
import * as validateTransferSaga from './ValidateTransferSaga'

/* ------------- API ------------- */
const authAPI = useFixtures ? FixtureAPI : AuthAPI.create()
const mainAPI= useFixtures ? FixtureAPI : MainAPI.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    takeLatest(AuthTypes.TOKEN_LOAD, loadToken, authAPI),

    takeLatest(AuthTypes.AUTH_REQUEST, login, authAPI),
    
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout, authAPI),

    takeLatest(PinCodeTypes.PIN_CODE_REQUEST, confirmPinCode, authAPI),

    takeLatest(ConfirmInscriptionTypes.DATASET_REQUEST,confirmInscriptionSaga.getDataset, mainAPI),

    takeLatest(ConfirmInscriptionTypes.ACCEPT_DEMAND,confirmInscriptionSaga.acceptDemand , mainAPI),
    
    takeLatest(ConfirmInscriptionTypes.REJECT_DEMAND,confirmInscriptionSaga.rejectDamand , mainAPI),

    takeLatest(ValidateTransferTypes.DATASET_REQUEST,validateTransferSaga.getDataset , mainAPI),
    
    takeLatest(ValidateTransferTypes.REJECT_DEMAND,validateTransferSaga.rejectDamand , mainAPI),

    takeLatest(ValidateTransferTypes.ACCEPT_DEMAND,validateTransferSaga.acceptDemand , mainAPI),

    takeLatest(OtherAccountTypes.DATASET_REQUEST,otherAccountSaga.getDataset , mainAPI),

    takeLatest(OtherAccountTypes.ACCEPT_DEMAND,otherAccountSaga.acceptDemand , mainAPI),

    takeLatest(OtherAccountTypes.REJECT_DEMAND,otherAccountSaga.rejectDamand , mainAPI),
  ])
}