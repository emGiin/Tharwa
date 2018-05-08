import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  exchangeRateRequest: [],
  exchangeRateFailure: ['error'],
  exchangeRateSuccess: ['data'],
  exchangeRateReset: []
})

export const ExchangeRateTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  success: false,
  error: null,
  rates: []
})

export const request = state => state.merge({
  fetching: true, success: false, error: null
})

export const success = (state, { data }) => (
  state.merge({
    fetching: false,
    error: null,
    success: false,
    rates: data
  })
)

export const failure = (state, { error }) => state.merge({
  fetching: false, error
})

export const reset = state => (
  state.merge({
    fetching: false,
    error: null,
    success: false
  })
)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXCHANGE_RATE_REQUEST]: request,
  [Types.EXCHANGE_RATE_SUCCESS]: success,
  [Types.EXCHANGE_RATE_FAILURE]: failure,
  [Types.EXCHANGE_RATE_RESET]: reset,
});