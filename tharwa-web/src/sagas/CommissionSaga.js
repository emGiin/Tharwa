import { call, put, select } from "redux-saga/effects";
import CommissionActions from "../redux/CommissionsRedux";


//get Token from the store
export const selectAuthToken = state => state.auth.authToken;

//get Pin code from the store
export const selectPinCode= state=>state.auth.pinCode;

export function* getCommList(api) {

  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
   }

  
  const response = yield call(api.getCommissionsList_);

  if (response.ok) {
    yield put(CommissionActions.reqListSuccess());
    console.log("Commission data geted in sagas :")
    console.log(response.data)
    yield put(CommissionActions.saveReqList(response.data));
  } else {
    yield put(CommissionActions.reqListFailure("code pin ou token invalide ou expiré!"));
  }
}

 // const response = yield call(api.inscriptionAction,body);
