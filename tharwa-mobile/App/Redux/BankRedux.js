import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  bankRequest: [],
  bankFailure: ['error'],
  bankSuccess: ['data']
})

export const BankTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  success: false,
  error: null,
  banks: []
})

export const request = state => state.merge({
  fetching: true, success: false, error: null
})

export const success = (state, { data }) => (
  state.merge({
    fetching: false,
    error: null,
    success: true,
    banks: data
  })
)

export const failure = (state, { error }) => state.merge({
  fetching: false, error
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BANK_REQUEST]: request,
  [Types.BANK_SUCCESS]: success,
  [Types.BANK_FAILURE]: failure
});