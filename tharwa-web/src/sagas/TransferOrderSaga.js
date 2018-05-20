import { call, put, select } from "redux-saga/effects";
import TransferOrderActions from "../redux/TransferOrderRedux";

export const selectAuthToken = state => state.auth.authToken;

export const selectPinCode = state => state.auth.pinCode;

export const setCredentials = function*(api) {
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
  }
};

export function* getTransferOrdersList(api) {
  //setCredentials(api);
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
  }
  const response = yield call(api.getTransferOrdersList);

  if (response.ok) {
    yield put(TransferOrderActions.transferOrderListSuccess());
    console.log(response.data);
    yield put(TransferOrderActions.saveTransferOrderList(response.data));
  } else {
    yield put(TransferOrderActions.transferOrderListFailure("Non authorisé"));
  }
}

export function* transferOrderAction(api, { id:{id, code} }) {
  //setCredentials(api);
  const authToken = yield select(selectAuthToken);
  console.log(authToken);
  
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  console.log(pinCode);
  
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
  }
  const response = yield call(api.transferOrderAction, { id, code });

  if (response.ok) {
    yield put(TransferOrderActions.transferOrderActionSuccess());
    yield put(TransferOrderActions.transferOrderListRequest());
  } else {
    yield put(
      TransferOrderActions.transferOrderActionFailure('code pin ou token invalide ou expiré!')
    );
  }
};