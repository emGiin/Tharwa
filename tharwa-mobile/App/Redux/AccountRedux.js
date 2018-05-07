import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  accountRequest: [],
  accountFailure: ['error'],
  accountSuccess: ['data'],
  newAccountSuccess: [],
  saveAccountType: ['accountType'],
  newAccountRequest: ['requestType'],
  newAccountReset: []
})

export const AccountTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  success: false,
  error: null,
  accountType: null,
  information: {}
})

export const request = state => state.merge({
  fetching: true, success: false, error: null
})

export const success = (state, { data }) => (
  state.merge({
    fetching: false,
    error: null,
    success: false,
    information: data
  })
)

export const failure = (state, { error }) => state.merge({
  fetching: false, error
})

export const saveAccountType = (state, { accountType }) => state.merge({
  accountType
})

export const newAccountRequest = state => state.merge({
  fetching: true, success: false, error: null
})


export const newAccountSuccess = state => (
  state.merge({
    fetching: false,
    error: null,
    success: true
  })
)

export const reset = state => (
  state.merge({
    fetching: false,
    error: null,
    success: false
  })
)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.SAVE_ACCOUNT_TYPE]: saveAccountType,
  [Types.NEW_ACCOUNT_REQUEST]: newAccountRequest,
  [Types.NEW_ACCOUNT_SUCCESS]: newAccountSuccess,
  [Types.NEW_ACCOUNT_RESET]: reset,
});