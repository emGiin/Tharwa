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
  setCredentials(api);
  const response = yield call(api.getClientsList);

  if (response.ok) {
    yield put(ClientManagementActions.clientsListSuccess());
    console.log(response.data);
    yield put(ClientManagementActions.saveClientsList(response.data));
  } else {
    yield put(ClientManagementActions.clientsListFailure("Non authorisé"));
  }
}

export function* actionRequest(api,params){
  setCredentials(api);
  console.log(params," saga");
  params=params.id;
      const body={
        account: params.account,
        motif:params.motif
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