import { call, put, select } from "redux-saga/effects";
import ConfirmInscriptionActions from "../redux/ConfirmInscriptionRedux";

export function* getRequestsList(api,{pinCode,token}) {
  const body = {
    client_id: "1",
    grant_type: "password"
  };

  const response = yield call(api.getRequestsList,body);

  if (response.ok) {
    yield put(ConfirmInscriptionActions.reqListSuccess());
    yield put(ConfirmInscriptionActions.saveReqList(response.data));
  } else {
    yield put(ConfirmInscriptionActions.reqListFailure("code pin ou token invalide ou expiré!"));
  }
}