import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';


//State
const INITIAL_STATE = Immutable({
  clients: {
    list: [],
    fetching: false,
    success: false,
    error: null
  },
  accountActions: {
    fetching: false,
    success: false,
    error: null
  }
});

//Functions
export const setDefault = state =>
  state.merge({ accountActions: { success: false, error: null } });

export const request = state =>
  state.merge(
    { clients: { fetching: true, success: false, error: null } }
  );

export const success = state =>
  state.merge(
    { clients: { fetching: false, error: null, success: true } }
  );

export const saveDataset = (state, { list }) =>
  state.merge({ clients: { list } });

export const failure = (state, { error }) =>
  state.merge({ clients: { fetching: false, error } }); //si code pin expiré popup de code pin

export const actionRequest = state =>
  state.merge(
    {
      accountActions: {
        fetching: true,
        success: false,
        error: null
      }
    }
  );

export const actionSuccess = state =>
  state.merge(
    {
      accountActions: {
        fetching: false,
        success: true,
        error: null
      }
    }
  );

export const actionFailure = (state, { error }) =>
  state.merge({ accountActions: { fetching: false, error } });


  //Actions
  const { Types, Creators } = createActions(
    {
      clientsListRequest: [],
      clientsListSuccess: [],
      clientsListFailure: ['error'],
      saveClientsList: ['list'],
  
      accountActionRequest: ['id'],
      accountActionSuccess: [],
      accountActionFailure: ['error'],
      accountActionSetDefault: []
    }
  );
  
  export const ClientManagementTypes = Types;
  export default Creators;
  //Reducer
export const reducer = createReducer(INITIAL_STATE, {
    [Types.CLIENTS_LIST_REQUEST]: request,
    [Types.CLIENTS_LIST_SUCCESS]: success,
    [Types.CLIENTS_LIST_FAILURE]: failure,
    [Types.SAVE_CLIENTS_LIST]: saveDataset,
    [Types.ACCOUNT_ACTION_REQUEST]: actionRequest,
    [Types.ACCOUNT_ACTION_SUCCESS]: actionSuccess,
    [Types.ACCOUNT_ACTION_FAILURE]: actionFailure,
    [Types.ACCOUNT_ACTION_SET_DEFAULT]: setDefault
  });


