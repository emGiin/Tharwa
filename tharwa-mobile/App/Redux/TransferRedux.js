import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  myAccountTransferRequest: ['data'],
  tharwaTransferRequest: ['data'],
  externalTransferRequest: ['data'],
  transferFailure: ['error'],
  transferSuccess: ['commission'],
  transferReset: [],
})

export const TransferTypes = Types
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

export const reset = state => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MY_ACCOUNT_TRANSFER_REQUEST]: request,
  [Types.THARWA_TRANSFER_REQUEST]: request,
  [Types.EXTERNAL_TRANSFER_REQUEST]: request,
  [Types.TRANSFER_SUCCESS]: success,
  [Types.TRANSFER_FAILURE]: failure,
  [Types.TRANSFER_RESET]: reset
});