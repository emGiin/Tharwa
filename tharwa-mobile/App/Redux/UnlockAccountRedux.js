import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  unlockAccountRequest: ['data'],
  unlockAccountFailure: ['error'],
  unlockAccountSuccess: [],
  unlockAccountReset: [],
})

export const UnlockAccountTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: false,
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

export const reset = state => state.merge({
  fetching: false,
  success: false,
  error: null
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UNLOCK_ACCOUNT_REQUEST]: request,
  [Types.UNLOCK_ACCOUNT_SUCCESS]: success,
  [Types.UNLOCK_ACCOUNT_FAILURE]: failure,
  [Types.UNLOCK_ACCOUNT_RESET]: reset
});