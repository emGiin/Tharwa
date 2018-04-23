import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

//Actions
const { Types, Creators } = createActions({
  setDefault:[],
  rejectDemand: ["id"],
  acceptDemand: ["id"],
  actionTransSuccess:[],
  actionTransFailure:["error"],
  datasetRequest:[],
  transListSuccess:[],
  transListFailure:["error"],
  saveTransList:["list"]
});

export const ValidateTransferTypes = Types;
export default Creators;

//State
const INITIAL_STATE = Immutable({
  list:[],
  fetching: false,
  success: false,
  error: null,
  actionSuccess: false,
  actionError:null,
  actionFetching:false
});

//Functions
export const setDefault= state=> state.merge({ actionSuccess: false , actionError:null });

export const request = state => state.merge({ fetching: true, success: false, error: null });

export const success = state =>{
  return state.merge({ fetching: false, error: null, success: true });
}

export const saveTransList = (state, { list }) => state.merge({ list });

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error });//si code pin expiré popup de code pin

export const actionReq=(state)=>
  state.merge({actionFetching:true, actionSuccess:false, actionError:null});

export const actionSuccess=(state)=>
state.merge({ actionFetching: false, actionError: null, actionSuccess: true });
  
export const actionFailure = (state, { error }) =>
  state.merge({ actionFetching: false, actionError:error });

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
