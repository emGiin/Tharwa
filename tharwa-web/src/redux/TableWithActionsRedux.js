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

export const saveDataset = (state, { list }) =>
  state.merge({ dataset: { list } }, { deep: true });

export const failure = (state, { error }) =>
  state.merge({ dataset: { fetching: false, error } }, { deep: true }); //si code pin expiré popup de code pin

export const actionRequest = state =>
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



export default namespace => {
  //Actions
  const { Types, Creators } = createActions(
    {
      datasetRequest: [],
      datasetSuccess: [],
      datasetFailure: ['error'],
      saveDataset: ['list'],
  
      acceptDemand: ['id'],
      rejectDemand: ['id'],
      actionSuccess: [],
      actionFailure: ['error'],
      setDefault: []
    },
    { prefix: namespace+'/' }
  );

  //Reducer
  const reducer = createReducer(INITIAL_STATE, {
    [Types.DATASET_REQUEST]: request,
    [Types.DATASET_SUCCESS]: success,
    [Types.DATASET_FAILURE]: failure,
    [Types.SAVE_DATASET]: saveDataset,
    [Types.REJECT_DEMAND]: actionRequest,
    [Types.ACCEPT_DEMAND]: actionRequest,
    [Types.ACTION_SUCCESS]: actionSuccess,
    [Types.ACTION_FAILURE]: actionFailure,
    [Types.SET_DEFAULT]: setDefault
  });

  return {reducer, Types, Creators}
}





