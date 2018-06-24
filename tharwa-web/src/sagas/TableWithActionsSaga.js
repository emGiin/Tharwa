import { call, put, select } from 'redux-saga/effects';

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

export default (Actions, holder) => {
  const getDataset = function*(api) {
    
    //setCredentials(api);
    const authToken = yield select(selectAuthToken);
    
    if (authToken) {
      yield call(api.setAuthToken, authToken);
    }
    const pinCode = yield select(selectPinCode);
    
    if (pinCode) {
      yield call(api.setPinCode, pinCode);
    }

    const response = yield call(api[holder].getDataset);
    if (response.ok) {
      yield put(Actions.datasetSuccess());
      yield put(Actions.saveDataset(response.data));
    } else {
      yield put(
        Actions.datasetFailure('code pin ou token invalide ou expiré!')
      );
    }
  };

  const requestAction = code =>
    function*(api, { id }) {
      //setCredentials(api);
      const authToken = yield select(selectAuthToken);
      
      if (authToken) {
        yield call(api.setAuthToken, authToken);
      }
      const pinCode = yield select(selectPinCode);
      
      if (pinCode) {
        yield call(api.setPinCode, pinCode);
      }
      const response = yield call(api[holder].action, { id, code });

      if (response.ok) {
        yield put(Actions.actionSuccess());
        yield put(Actions.datasetRequest());
      } else {
        yield put(
          Actions.actionFailure('code pin ou token invalide ou expiré!')
        );
      }
    };

  return {
    getDataset,
    acceptDemand: requestAction(1),
    rejectDamand: requestAction(0)
  };
};
