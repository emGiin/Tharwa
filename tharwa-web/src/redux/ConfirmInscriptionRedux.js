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
    reqListSuccess: [],
    reqListFailure: ['error'],
    saveReqList: ['list'],

    rejectDemand: ['email'],
    acceptDemand: ['email'],
    actionSuccess: [],
    actionFailure: ['error'],
    setDefault: []
  },
  { prefix: 'INSCRIPTIONS_' }
);

//Functions
export const setDefault = state =>
  state.merge({ action: { success: false, error: null } }, { deep: true });

export const request = state =>
  state.merge(
    { dataset: { fetching: true, success: false, error: null } },
    { deep: true }
  );

export const success = state => {
  return state.merge(
    { dataset: { fetching: false, error: null, success: true } },
    { deep: true }
  );
};

export const saveReqList = (state, { list }) =>
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
        error: null,
        success: true
      }
    },
    { deep: true }
  );

export const actionFailure = (state, { error }) =>
  state.merge({ action: { fetching: false, error } }, { deep: true });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DATASET_REQUEST]: request,
  [Types.REQ_LIST_SUCCESS]: success,
  [Types.REQ_LIST_FAILURE]: failure,
  [Types.SAVE_REQ_LIST]: saveReqList,
  [Types.REJECT_DEMAND]: actionReq,
  [Types.ACCEPT_DEMAND]: actionReq,
  [Types.ACTION_SUCCESS]: actionSuccess,
  [Types.ACTION_FAILURE]: actionFailure,
  [Types.SET_DEFAULT]: setDefault
});

export const ConfirmInscriptionTypes = Types;
export default Creators;
