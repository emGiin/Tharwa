import { call, put, select } from "redux-saga/effects";
import ValidateTransferActions from "../redux/ValidateTransferRedux";


//get Token from the store
export const selectAuthToken = state => state.auth.authToken;

//get Pin code from the store
export const selectPinCode= state=>state.auth.pinCode;

export function* getTransfersList(api) {
  //Headers
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
   }
  const response = yield call(api.getTransfersList);

  if (response.ok) {
    yield put(ValidateTransferActions.transListSuccess());
    yield put(ValidateTransferActions.saveTransList(response.data));
  } else {
    yield put(ValidateTransferActions.transListFailure("code pin ou token invalide ou expiré!"));
  }
}

export function* rejectTransfer(api,params){
  console.log("start");
  //Headers
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
   }
  const body={
    id:params.id,
    code: 0
  };
  console.log("1");
  const response = yield call(api.transferAction,body);
  console.log("ok");
  if (response.ok) {
    yield put(ValidateTransferActions.actionTransSuccess());
    yield put(ValidateTransferActions.transListRequest());
  } else {
    yield put(ValidateTransferActions.actionTransFailure("code pin ou token invalide ou expiré!"));
  }

}

export function* acceptTransfer(api,params){
  console.log("start");
  //Headers
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
   }
  console.log("saga");
  console.log(params.id);
  
  const body={
    id:params.id,
    code: 1
  };
  console.log("1");
  const response = yield call(api.transferAction,body);
  console.log("ok");
  if (response.ok) {
    yield put(ValidateTransferActions.actionTransSuccess());
    yield put(ValidateTransferActions.transListRequest());
  } else {
    yield put(ValidateTransferActions.actionTransFailure("code pin ou token invalide ou expiré!"));
  }

}

