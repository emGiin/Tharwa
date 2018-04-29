import { call, put, select } from 'redux-saga/effects';
import ConfirmInscriptionActions from '../redux/ConfirmInscriptionRedux';

//get Token from the store
export const selectAuthToken = state => state.auth.authToken;

//get Pin code from the store
export const selectPinCode = state => state.auth.pinCode;

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
    yield put(ConfirmInscriptionActions.datasetSuccess());
    yield put(ConfirmInscriptionActions.saveDataset(response.data));
  } else {
    yield put(
      ConfirmInscriptionActions.datasetFailure(
        'code pin ou token invalide ou expiré!'
      )
    );
  }
}

export function* rejectDemand(api, { id }) {
  //Headers
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
  }
  const body = {
    email: id,
    code: 0
  };
  const response = yield call(api.inscriptionAction, body);
  if (response.ok) {
    yield put(ConfirmInscriptionActions.actionSuccess());
    yield put(ConfirmInscriptionActions.datasetRequest());
  } else {
    yield put(
      ConfirmInscriptionActions.actionFailure(
        'code pin ou token invalide ou expiré!'
      )
    );
  }
}

export function* acceptDemand(api, { id }) {
  //Headers
  const authToken = yield select(selectAuthToken);
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  const pinCode = yield select(selectPinCode);
  if (pinCode) {
    yield call(api.setPinCode, pinCode);
  }

  const body = {
    email: id,
    code: 1
  };

  const response = yield call(api.inscriptionAction, body);

  if (response.ok) {
    yield put(ConfirmInscriptionActions.actionSuccess());
    yield put(ConfirmInscriptionActions.datasetRequest());
  } else {
    yield put(
      ConfirmInscriptionActions.actionFailure(
        'code pin ou token invalide ou expiré!'
      )
    );
  }
}
