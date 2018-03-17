import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

//Actions
const { Types, Creators } = createActions({
  //rejectRequest: ["email"],
  //rejectSuccess: [],
  //rejectFailure: ["error"],
  reqListRequest:[],
  reqListSuccess:[],
  reqListFailure:["error"]
});

export const ConfirmInscriptionTypes = Types;
export default Creators;

//State
const INITIAL_STATE = Immutable({
  list:[],
  fetching: false,
  success: false,
  error: null
});

//Functions
export const request = state => state.merge({ fetching: true, success: false, error: null });

export const success = state =>
  state.merge({ fetching: false, error: null, success: true });

export const saveReqList = (state, { list }) => state.merge({ list });

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error });//si code pin expiré popup de code pin

export const reducer = createReducer(INITIAL_STATE, {
    [Types.REQ_LIST_REQUEST]: request,
    [Types.REQ_LIST_SUCCESS]: success,
    [Types.REQ_LIST_FAILURE]: failure
});
