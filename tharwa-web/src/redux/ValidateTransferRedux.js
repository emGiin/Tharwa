import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

//State
const INITIAL_STATE = Immutable({
  dataset: {
    list: [],
    fetching: false,
    success: false,
    error: null
  },
  action: {
    fetching: false,
    success: false,
    error: null
  }
});

//Actions
const { Types, Creators } = createActions(
  {
    datasetRequest: [],
    transListSuccess: [],
    transListFailure: ['error'],
    saveTransList: ['list'],

    acceptDemand: ['id'],
    rejectDemand: ['id'],
    actionTransSuccess: [],
    actionTransFailure: ['error'],
    setDefault: []
  },
  { prefix: 'TRANSFERS_' }
);

//Functions
export const setDefault = state =>
  state.merge({ action: { success: false, error: null } }, { deep: true });

export const request = state =>
  state.merge(
    { dataset: { fetching: true, success: false, error: null } },
    { deep: true }
  );

export const success = state =>
  state.merge(
    { dataset: { fetching: false, error: null, success: true } },
    { deep: true }
  );

export const saveTransList = (state, { list }) =>
  state.merge({ dataset: { list } }, { deep: true });

export const failure = (state, { error }) =>
  state.merge({ dataset: { fetching: false, error } }, { deep: true }); //si code pin expiré popup de code pin

export const actionReq = state =>
  state.merge(
    {
      action: {
        fetching: true,
        success: false,
        error: null
      }
    },
    { deep: true }
  );

export const actionSuccess = state =>
  state.merge(
    {
      action: {
        fetching: false,
        success: true,
        error: null
      }
    },
    { deep: true }
  );

export const actionFailure = (state, { error }) =>
  state.merge({ action: { fetching: false, error } }, { deep: true });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DATASET_REQUEST]: request,
  [Types.TRANS_LIST_SUCCESS]: success,
  [Types.TRANS_LIST_FAILURE]: failure,
  [Types.SAVE_TRANS_LIST]: saveTransList,
  [Types.REJECT_DEMAND]: actionReq,
  [Types.ACCEPT_DEMAND]: actionReq,
  [Types.ACTION_TRANS_SUCCESS]: actionSuccess,
  [Types.ACTION_TRANS_FAILURE]: actionFailure,
  [Types.SET_DEFAULT]: setDefault
});

export const ValidateTransferTypes = Types;
export default Creators;
