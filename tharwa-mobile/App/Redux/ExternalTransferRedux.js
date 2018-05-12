import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  externalTransferRequest: ['data'],
  externalTransferFailure: ['error'],
  externalTransferSuccess: ['commission'],
  externalTransferReset: [],
})

export const ExternalTransferTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: false,
  success: false,
  error: null,
  commission: 0
})

export const request = state => state.merge({ fetching: true, success: false })

export const success = (state, { commission }) => state.merge({
  fetching: false,
  error: null,
  success: true,
  commission
})

export const failure = (state, { error }) => state.merge({
  success: false,
  fetching: false,
  error
})

export const reset = state => state.merge({
  fetching: false,
  success: false,
  error: null,
  commission: 0
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXTERNAL_TRANSFER_REQUEST]: request,
  [Types.EXTERNAL_TRANSFER_SUCCESS]: success,
  [Types.EXTERNAL_TRANSFER_FAILURE]: failure,
  [Types.EXTERNAL_TRANSFER_RESET]: reset
});