import { call, put, select } from "redux-saga/effects";
import ConfirmInscriptionActions from "../redux/ConfirmInscriptionRedux";


//get Token from the store
export const selectAuthToken = state => state.auth.authToken;

//get Pin code from the store
export const selectPinCode= state=>state.auth.pinCode;

export function* getRequestsList(api) {
  //Headers
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
   }

  
  const response = yield call(api.getRequestsList);

  if (response.ok) {
    yield put(ConfirmInscriptionActions.reqListSuccess());
    yield put(ConfirmInscriptionActions.saveReqList(response.data));
  } else {
    yield put(ConfirmInscriptionActions.reqListFailure("code pin ou token invalide ou expiré!"));
  }
}

export function* rejectDemand(api,{email}){
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
    email:email,
    code: 0
  };
  console.log("1");
  const response = yield call(api.inscriptionAction,body);
  console.log("ok");
  if (response.ok) {
    yield put(ConfirmInscriptionActions.actionSuccess());
    yield put(ConfirmInscriptionActions.reqListRequest());
    console.log("fin list req");
    
  } else {
    yield put(ConfirmInscriptionActions.actionFailure("code pin ou token invalide ou expiré!"));
  }

}

export function* acceptDemand(api,{email}){
  //Headers
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
   }
   console.log("rightSaga");
   console.log(email);
   
   
  const body={
    email:email,
    code: 1
  };

  const response = yield call(api.inscriptionAction,body);

  if (response.ok) {
    yield put(ConfirmInscriptionActions.actionSuccess());
    yield put(ConfirmInscriptionActions.reqListRequest());
  } else {
    yield put(ConfirmInscriptionActions.actionFailure("code pin ou token invalide ou expiré!"));
  }

}