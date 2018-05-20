import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';


//State
const INITIAL_STATE = Immutable({
  deblockRequests: {
    list: [],
    fetching: false,
    success: false,
    error: null
  },
  deblockAccountActions: {
    fetching: false,
    success: false,
    error: null
  }
});

//Functions
export const setDefault = state =>
  state.merge({ deblockAccountActions: { success: false, error: null } });

export const request = state =>
  state.merge(
    { deblockRequests: { fetching: true, success: false, error: null } }
  );

export const success = state =>
  state.merge(
    { deblockRequests: { fetching: false, error: null, success: true } }
  );

export const saveDataset = (state, { list }) =>
  state.merge({ deblockRequests: { list } });

export const failure = (state, { error }) =>
  state.merge({ deblockRequests: { fetching: false, error } }); //si code pin expiré popup de code pin

export const actionRequest = state =>
  state.merge(
    {
      deblockAccountActions: {
        fetching: true,
        success: false,
        error: null
      }
    }
  );

export const actionSuccess = state =>
  state.merge(
    {
      deblockAccountActions: {
        fetching: false,
        success: true,
        error: null
      }
    }
  );

export const actionFailure = (state, { error }) =>
  state.merge({ deblockAccountActions: { fetching: false, error } });


  //Actions
  const { Types, Creators } = createActions(
    {
      deblockRequestsListRequest: [],
      deblockRequestsListSuccess: [],
      deblockRequestsListFailure: ['error'],
      saveDeblockRequestsList: ['list'],
  
      deblockAccountActionRequest: ['id'],
      deblockAccountActionSuccess: [],
      deblockAccountActionFailure: ['error'],
      deblockAccountActionSetDefault: []
    }
  );
  
  export const DeblockAccountTypes = Types;
  export default Creators;
  //Reducer
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DEBLOCK_REQUESTS_LIST_REQUEST]: request,
    [Types.DEBLOCK_REQUESTS_LIST_SUCCESS]: success,
    [Types.DEBLOCK_REQUESTS_LIST_FAILURE]: failure,
    [Types.SAVE_DEBLOCK_REQUESTS_LIST]: saveDataset,
    [Types.DEBLOCK_ACCOUNT_ACTION_REQUEST]: actionRequest,
    [Types.DEBLOCK_ACCOUNT_ACTION_SUCCESS]: actionSuccess,
    [Types.DEBLOCK_ACCOUNT_ACTION_FAILURE]: actionFailure,
    [Types.DEBLOCK_ACCOUNT_ACTION_SET_DEFAULT]: setDefault
  });


