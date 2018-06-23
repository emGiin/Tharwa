import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';


//State
const INITIAL_STATE = Immutable({
  transferOrder: {
    list: [],
    fetching: false,
    success: false,
    error: null
  },
  transferOrderActions: {
    fetching: false,
    success: false,
    error: null
  }
});

//Functions
export const setDefault = state =>
  state.merge({ transferOrderActions: { success: false, error: null } }, { deep: true });

export const request = state =>
  state.merge(
    { transferOrder: { fetching: true, success: false, error: null } }, { deep: true }
  );

export const success = state =>
  state.merge(
    { transferOrder: { fetching: false, error: null, success: true } }, { deep: true }
  );

export const saveDataset = (state, { list }) =>
  state.merge({ transferOrder: { list } }, { deep: true });

export const failure = (state, { error }) =>
  state.merge({ transferOrder: { fetching: false, error } }, { deep: true }); //si code pin expiré popup de code pin

export const actionRequest = state =>
  state.merge(
    {
      transferOrderActions: {
        fetching: true,
        success: false,
        error: null
      }
    }, { deep: true }
  );

export const actionSuccess = state =>
  state.merge(
    {
      transferOrderActions: {
        fetching: false,
        success: true,
        error: null
      }
    }, { deep: true }
  );

export const actionFailure = (state, { error }) =>
  state.merge({ transferOrderActions: { fetching: false, error } }, { deep: true });


  //Actions
  const { Types, Creators } = createActions(
    {
      transferOrderListRequest: [],
      transferOrderListSuccess: [],
      transferOrderListFailure: ['error'],
      saveTransferOrderList: ['list'],
  
      transferOrderAction: ['id'],
      transferOrderActionSuccess: [],
      transferOrderActionFailure: ['error'],
      transferOrderSetDefault: []
    }
  );
  
  export const TransferOrderTypes = Types;
  export default Creators;
  //Reducer
export const reducer = createReducer(INITIAL_STATE, {
    [Types.TRANSFER_ORDER_LIST_REQUEST]: request,
    [Types.TRANSFER_ORDER_LIST_SUCCESS]: success,
    [Types.TRANSFER_ORDER_LIST_FAILURE]: failure,
    [Types.SAVE_TRANSFER_ORDER_LIST]: saveDataset,
    [Types.TRANSFER_ORDER_ACTION]: actionRequest,
    [Types.TRANSFER_ORDER_ACTION_SUCCESS]: actionSuccess,
    [Types.TRANSFER_ORDER_ACTION_FAILURE]: actionFailure,
    [Types.TRANSFER_ORDER_SET_DEFAULT]: setDefault
  });


