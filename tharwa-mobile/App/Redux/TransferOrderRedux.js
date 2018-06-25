import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  transferOrderRequest: [],
  transferOrderFailure: ['error'],
  transferOrderSuccess: ['data'],
  newTransferOrderRequest: ['data'],
  newTransferOrderSuccess: [],
  transferOrderReset: []
})

export const TransferOrderTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  success: false,
  error: null,
  history: []
})

export const request = state => state.merge({
  fetching: true, success: false, error: null
})

export const success = (state, { data }) => (
  state.merge({
    fetching: false,
    error: null,
    success: false,
    history: data
  })
)

export const newSuccess = state => (
  state.merge({
    fetching: false,
    error: null,
    success: true
  })
)

export const failure = (state, { error }) => state.merge({
  fetching: false, error, success: false
})

export const reset = state => state.merge({
  fetching: false,
  success: false,
  error: null,
  history: []
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSFER_ORDER_REQUEST]: request,
  [Types.TRANSFER_ORDER_SUCCESS]: success,
  [Types.NEW_TRANSFER_ORDER_SUCCESS]: newSuccess,
  [Types.TRANSFER_ORDER_FAILURE]: failure,
  [Types.NEW_TRANSFER_ORDER_REQUEST]: request,
  [Types.TRANSFER_ORDER_RESET]: reset
});