import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  transferRequest: ['method', 'amount'],
  transferFailure: ['error'],
  transferSuccess: []
})

export const TransferTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  loading: false,
  success: false,
  error: null
})

export const request = state => state.merge({ fetching: true, success: false })

export const success = state => state.merge({
  fetching: false,
  error: null,
  success: true
})

export const failure = (state, { error }) => state.merge({
  success: false,
  fetching: false,
  error
})
export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSFER_REQUEST]: request,
  [Types.TRANSFER_SUCCESS]: success,
  [Types.TRANSFER_FAILURE]: failure
});