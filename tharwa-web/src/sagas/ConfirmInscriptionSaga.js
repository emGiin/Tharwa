import { call, put, select } from "redux-saga/effects";
import ConfirmInscriptionActions from "../redux/ConfirmInscriptionRedux";


//get Token from the store
export const selectAuthToken = state => state.auth.authToken;
//get Pin code from the store
////To do

export function* getRequestsList(api) {
  const body = {
    client_id: "1",
    grant_type: "password"
  };
  //Headers
console.log('here0');
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  //const pinCode = yield select(selectPinCode);
  //if (pinCode) {
  //  yield call(api.setPinCode, pinCode);
  // }
console.log('here1', api);

  
  const response = yield call(api.getRequestsList,body);

  console.log('here2', response);
  if (response.ok) {
    yield put(ConfirmInscriptionActions.reqListSuccess());
    yield put(ConfirmInscriptionActions.saveReqList(response.data));
  } else {
    yield put(ConfirmInscriptionActions.reqListFailure("code pin ou token invalide ou expiré!"));
  }
}

