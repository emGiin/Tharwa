import { call, put, select } from "redux-saga/effects";

import PinCodeActions from "../redux/PinCodeRedux";
import AuthActions from "../redux/AuthRedux";

export function* confirmPinCode(api, { pinCode }) {
  const token = yield select(state => state.pinCode.pinCodeToken);
  const response = yield call(api.confirmPinCode, {
    pin_code: pinCode,
    temporary_token: token
  });

  if (response.ok) {
    yield put(PinCodeActions.pinCodeSuccess());
    yield put(AuthActions.saveAuthToken(response.data.token));
  } else {
    yield put(
      PinCodeActions.pinCodeFailure(
        "Le code pin introduit est errorné ou a expiré"
      )
    );
  }
}
