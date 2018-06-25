import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    NewOrderRequest: ['data'],
    NewOrderFailure: ['error'],
    NewOrderSuccess: [],
    NewOrderReset: [],
})

export const NewOrderTypes = Types
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
  [Types.NEW_ORDER_REQUEST]: request,
  [Types.NEW_ORDER_SUCCESS]: success,
  [Types.NEW_ORDER_FAILURE]: failure,
  [Types.NEW_ORDER_RESET]: reset
});