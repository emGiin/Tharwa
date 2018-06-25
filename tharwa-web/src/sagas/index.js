import { all, takeLatest } from 'redux-saga/effects'
import AuthAPI from '../services/AuthAPI'
import appAPI from '../services/appAPI'
import FixtureAPI from '../services/FixtureAPI'
import banquierAPI from '../services/createBanquier'
import MainAPI from '../services/MainAPI'
import {useFixtures} from '../config/DebugConfig'

/* ------------- Types ------------- */
import { AuthTypes } from '../redux/AuthRedux'
import { PinCodeTypes } from '../redux/PinCodeRedux'
import { ConfirmInscriptionTypes } from '../redux/ConfirmInscriptionRedux'
import { OtherAccountTypes } from '../redux/OtherAccountRedux'
import { ValidateTransferTypes} from '../redux/ValidateTransferRedux'
import { newBanquierTypes} from '../redux/banquierRedux'
import { statsTypes} from '../redux/StatsRedux'
import { CommissionsTypes} from '../redux/CommissionsRedux'
import { BankerDashboardTypes} from '../redux/BankerDashboardRedux'
import { ClientManagementTypes } from '../redux/ClientManagementRedux'
import { TransferOrderTypes} from '../redux/TransferOrderRedux'
import { DeblockAccountTypes} from '../redux/DeblockAccountRedux'

/* ------------- Sagas ------------- */
import { login, logout, loadToken } from './AuthSaga'
import { confirmPinCode } from './PinCodeSaga'
import { register } from './banquierSagas'
import { get_stats} from './StatsSagas'
import { getCommList} from './CommissionSaga'
import { getCounts } from './BankerDashboardSaga'
import { getClientsList, actionRequest} from './ClientManagementSaga'
import { getTransferOrdersList, transferOrderAction } from './TransferOrderSaga'
import { getDeblockRequestsList, deblockAccountActionRequest} from './DeblockAccountSaga'

import * as confirmInscriptionSaga from './ConfirmInscriptionSaga'
import * as otherAccountSaga from './OtherAccountSaga'
import * as validateTransferSaga from './ValidateTransferSaga'

/* ------------- API ------------- */
const authAPI = useFixtures ? FixtureAPI : AuthAPI.create()
const mainAPI= useFixtures ? FixtureAPI : MainAPI.create()
const api_b= useFixtures ? FixtureAPI : banquierAPI.create() //TODO: remove this
const api_= useFixtures ? FixtureAPI : appAPI.create()

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

    takeLatest(BankerDashboardTypes.NBRE_REQUEST, getCounts, mainAPI),

    takeLatest(ClientManagementTypes.CLIENTS_LIST_REQUEST, getClientsList, mainAPI),

    takeLatest(ClientManagementTypes.ACCOUNT_ACTION_REQUEST, actionRequest, mainAPI),

    takeLatest(TransferOrderTypes.TRANSFER_ORDER_LIST_REQUEST, getTransferOrdersList, mainAPI),
    
    takeLatest(TransferOrderTypes.TRANSFER_ORDER_ACTION, transferOrderAction, mainAPI),

    takeLatest(DeblockAccountTypes.DEBLOCK_REQUESTS_LIST_REQUEST, getDeblockRequestsList, mainAPI),

    takeLatest(newBanquierTypes.CREATE_BANQUIER,register , api_b),

    takeLatest(statsTypes.SET_STATS,get_stats , api_),

    takeLatest(CommissionsTypes.REQ_LIST_COMM ,getCommList, api_),
    
    takeLatest(DeblockAccountTypes.DEBLOCK_ACCOUNT_ACTION_REQUEST, deblockAccountActionRequest, mainAPI),
   
    takeLatest(newBanquierTypes.CREATE_BANQUIER,register , api_b)
  ])
}