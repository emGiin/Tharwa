import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
//Actions
const { Types, Creators } = createActions({
  setDefault: [],
  actionSuccess: [],
  actionFailure: ["error"],
  reqListComm: [],
  reqListSuccess: [],
  reqListFailure: ["error"],
  saveReqList: ["list"]
});

export const CommissionsTypes = Types;
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
 {
   console.log("hellllo redux");
   return state.merge({ fetching: true, success: false, error: null });
 } 

export const success = state => {
  return state.merge({ fetching: false, error: null, success: true });
};

export const saveReqList = (state, { list }) =>{
  console.log("save Rqest Liste ..... || saved")
  return state.merge({ list: list  });
};

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error }); 


export const actionSuccess = state =>
  state.merge({
    actionFetching: false,
    actionError: null,
    actionSuccess: true
  });

export const actionFailure = (state, { error }) =>
  state.merge({ actionFetching: false, actionError: error });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQ_LIST_COMM]: request,
  [Types.REQ_LIST_SUCCESS]: success,
  [Types.REQ_LIST_FAILURE]: failure,
  [Types.SAVE_REQ_LIST]: saveReqList,
  [Types.ACTION_SUCCESS]: actionSuccess,
  [Types.ACTION_FAILURE]: actionFailure,
  [Types.SET_DEFAULT]: setDefault
});
