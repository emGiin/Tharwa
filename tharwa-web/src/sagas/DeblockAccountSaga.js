import { call, put, select } from "redux-saga/effects";
import DeblockAccountActions from "../redux/DeblockAccountRedux";

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

export function* getDeblockRequestsList(api) {
  //setCredentials(api);
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
  }
  const response = yield call(api.getDeblockRequestsList);

  if (response.ok) {
    yield put(DeblockAccountActions.deblockRequestsListSuccess());
    console.log(response.data);
    yield put(DeblockAccountActions.saveDeblockRequestsList(response.data));
  } else {
    yield put(DeblockAccountActions.deblockRequestsListFailure("Non authorisé"));
  }
}

export function* deblockAccountActionRequest(api,{id:{account, motif}}){
 // setCredentials(api);
 const authToken = yield select(selectAuthToken);
 if (authToken) {
   yield call(api.setAuthToken, authToken);
 }
 const pinCode = yield select(selectPinCode);
 if (pinCode) {
   yield call(api.setPinCode, pinCode);
 }
 const code= (motif==null? 0:1)
      const body={
        account,
        motif,
        code
      }
      
      const response = yield call(api.deblockAccountAction,body);

      if (response.ok) {
        yield put(DeblockAccountActions.deblockAccountActionSuccess());
        yield put(DeblockAccountActions.deblockRequestsListRequest());
      } else {
        yield put(
         DeblockAccountActions.deblockAccountActionFailure('code pin ou token invalide ou expiré!')
        );
      }
}