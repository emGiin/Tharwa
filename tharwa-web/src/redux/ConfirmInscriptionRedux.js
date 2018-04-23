import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import {CONTENT_BASE_URL} from "../config/AppConfig";
//Actions
const { Types, Creators } = createActions({
  setDefault: [],
  rejectDemand: ["email"],
  acceptDemand: ["email"],
  actionSuccess: [],
  actionFailure: ["error"],
  datasetRequest: [],
  reqListSuccess: [],
  reqListFailure: ["error"],
  saveReqList: ["list"]
});

export const ConfirmInscriptionTypes = Types;
export default Creators;

//State
const INITIAL_STATE = Immutable({
  list: [],
  fetching: false,
  success: false,
  error: null,
  actionSuccess: false,
  actionError: null,
  actionFetching: false
});

//Functions
export const setDefault = state =>
  state.merge({ actionSuccess: false, actionError: null });

export const request = state =>
  state.merge({ fetching: true, success: false, error: null });

export const success = state => {
  return state.merge({ fetching: false, error: null, success: true });
};

export const saveReqList = (state, { list }) =>
  state.merge({
    list: list.map(record => {
      return { ...record, picture: CONTENT_BASE_URL + record.picture };
    })
  });

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error }); //si code pin expiré popup de code pin

export const actionReq = state =>
  state.merge({
    actionFetching: true,
    actionSuccess: false,
    actionError: null
  });

export const actionSuccess = state =>
  state.merge({
    actionFetching: false,
    actionError: null,
    actionSuccess: true
  });

export const actionFailure = (state, { error }) =>
  state.merge({ actionFetching: false, actionError: error });

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
