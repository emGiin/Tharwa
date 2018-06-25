import { call, put, select } from "redux-saga/effects";
import bankerDashboardActions from "../redux/BankerDashboardRedux";

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

export function* getCounts(api) {
  setCredentials(api);
  const response = yield call(api.getCounts);

  if (response.ok) {
    yield put(bankerDashboardActions.nbreSuccess());
    yield put(bankerDashboardActions.saveNbre(response.data));
  } else {
    yield put(bankerDashboardActions.nbreFailure("Non authorisé"));
  }
}