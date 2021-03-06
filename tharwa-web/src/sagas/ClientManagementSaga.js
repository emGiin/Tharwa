import { call, put, select } from "redux-saga/effects";
import ClientManagementActions from "../redux/ClientManagementRedux";

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

export function* getClientsList(api) {
  //setCredentials(api);
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
  }
  const response = yield call(api.getClientsList);

  if (response.ok) {
    yield put(ClientManagementActions.clientsListSuccess());
    yield put(ClientManagementActions.saveClientsList(response.data));
  } else {
    yield put(ClientManagementActions.clientsListFailure("Non authorisé"));
  }
}

export function* actionRequest(api,{id:{account, motif,type}}){
 // setCredentials(api);
 const authToken = yield select(selectAuthToken);
 if (authToken) {
   yield call(api.setAuthToken, authToken);
 }
 const pinCode = yield select(selectPinCode);
 if (pinCode) {
   yield call(api.setPinCode, pinCode);
 }
      const body={
        account,
        motif,
        code:type
      }
      const response = yield call(api.accountAction,body);

      if (response.ok) {
        yield put(ClientManagementActions.accountActionSuccess());
        yield put(ClientManagementActions.clientsListRequest());
      } else {
        yield put(
         ClientManagementActions.accountActionFailure('code pin ou token invalide ou expiré!')
        );
      }
}