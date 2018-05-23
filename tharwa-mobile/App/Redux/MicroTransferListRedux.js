import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  microTransferListRequest: ['data'],
  microTransferListFailure: ['error'],
  microTransferListSuccess: ['list'],
  microTransferListReset: [],
})

export const MicroTransferListTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: false,
  success: false,
  error: null,
  list: []
})

export const request = state => state.merge({ fetching: true, success: false })

export const success = (state, { list }) => state.merge({
  fetching: false,
  error: null,
  success: true,
  list
})

export const failure = (state, { error }) => state.merge({
  success: false,
  fetching: false,
  error
})

export const reset = state => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MICRO_TRANSFER_LIST_REQUEST]: request,
  [Types.MICRO_TRANSFER_LIST_SUCCESS]: success,
  [Types.MICRO_TRANSFER_LIST_FAILURE]: failure,
  [Types.MICRO_TRANSFER_LIST_RESET]: reset
});