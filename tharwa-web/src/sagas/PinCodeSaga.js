import { call, put, select } from "redux-saga/effects";

import PinCodeActions from "../redux/PinCodeRedux";
import AuthActions from "../redux/AuthRedux";

export function* confirmPinCode(api, { pinCode }) {
  const token = yield select(selectPinCodeToken);
  const response = yield call(api.confirmPinCode, {
    pin: pinCode,
    temporary_token: token
  });

  if (response.ok) {
    yield put(PinCodeActions.pinCodeSuccess());
    yield put(AuthActions.saveAuthToken(response.data.token_, pinCode));
  } else {
    yield put(
      PinCodeActions.pinCodeFailure(
        "Le code pin introduit est errorné ou a expiré"
      )
    );
  }
}

export const selectPinCodeToken = state => state.pinCode.pinCodeToken;
