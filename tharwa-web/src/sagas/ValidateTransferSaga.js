// import { call, put, select } from 'redux-saga/effects';
// import ValidateTransferActions from '../redux/ValidateTransferRedux';

// //get Token from the store
// export const selectAuthToken = state => state.auth.authToken;

// //get Pin code from the store
// export const selectPinCode = state => state.auth.pinCode;

// export function* getTransfersList(api) {
//   //Headers
//   const authToken = yield select(selectAuthToken);
//   if (authToken) {
//     yield call(api.setAuthToken, authToken);
//   }
//   const pinCode = yield select(selectPinCode);
//   if (pinCode) {
//     yield call(api.setPinCode, pinCode);
//   }
//   const response = yield call(api.getTransfersList);

//   if (response.ok) {
//     yield put(ValidateTransferActions.datasetSuccess());
//     yield put(ValidateTransferActions.saveDataset(response.data));
//   } else {
//     yield put(
//       ValidateTransferActions.datasetFailure(
//         'code pin ou token invalide ou expiré!'
//       )
//     );
//   }
// }

// export function* rejectTransfer(api, { id }) {
//   //Headers
//   const authToken = yield select(selectAuthToken);
//   if (authToken) {
//     yield call(api.setAuthToken, authToken);
//   }
//   const pinCode = yield select(selectPinCode);
//   if (pinCode) {
//     yield call(api.setPinCode, pinCode);
//   }
//   const body = {
//     virement_code: id,
//     code: 0
//   };
//   const response = yield call(api.transferAction, body);
//   if (response.ok) {
//     yield put(ValidateTransferActions.actionSuccess());
//     yield put(ValidateTransferActions.datasetRequest());
//   } else {
//     yield put(
//       ValidateTransferActions.actionFailure(
//         'code pin ou token invalide ou expiré!'
//       )
//     );
//   }
// }

// export function* acceptTransfer(api, { id }) {
//   //Headers
//   const authToken = yield select(selectAuthToken);
//   if (authToken) {
//     yield call(api.setAuthToken, authToken);
//   }
//   const pinCode = yield select(selectPinCode);
//   if (pinCode) {
//     yield call(api.setPinCode, pinCode);
//   }

//   const body = {
//     virement_code: id,
//     code: 1
//   };
//   const response = yield call(api.transferAction, body);
//   if (response.ok) {
//     yield put(ValidateTransferActions.actionSuccess());
//     yield put(ValidateTransferActions.datasetRequest());
//   } else {
//     yield put(
//       ValidateTransferActions.actionFailure(
//         'code pin ou token invalide ou expiré!'
//       )
//     );
//   }
// }

import ValidateTransferActions from '../redux/ValidateTransferRedux';
import createSaga from './TableWithActionsSaga';

export let { getDataset, acceptDemand, rejectDamand } = createSaga(
  ValidateTransferActions, 'virements'
);
