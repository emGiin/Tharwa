import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  authRequest: ['email', 'password', 'confirmationMethod'],
  authSuccess: ['pinCodeToken'],
  authFailure: ['error'],
  logoutRequest: null,
  logoutSuccess: null,
  pinCodeRequest: ['pinCodeToken', 'pinCode'],
  pinCodeSuccess: ['authToken'],
  pinCodeFailure: ['error'],
  tokenLoad: [],
  tokenLoadSuccess: []
})

export const AuthTypes = Types
export default Creators


const INITIAL_STATE = Immutable({
  fetching: false,
  loading: false,
  error: false,
  pinCodeToken: null,
  authToken: null
})

export const request = (state) => state.merge({ fetching: true })

export const success = (state, { token }) => (
  state.merge({
    fetching: false,
    error: null,
    pinCodeToken: token
  })
)

export const failure = (state, { error }) => state.merge({ fetching: false, error })

// we're attempting to load token from startup sagas
export const load = (state) => state.merge({ loading: true })
export const loadSuccess = (state) => state.merge({ loading: false })

// we need to logout, meaning clear access tokens and account
export const logoutRequest = state => state
export const logoutSuccess = state => INITIAL_STATE

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,
  [Types.TOKEN_LOAD]: load,
  [Types.TOKEN_LOAD_SUCCESS]: loadSuccess,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess
});