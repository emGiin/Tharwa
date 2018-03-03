import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  authRequest: ['email', 'password', 'confirmationMethod'],
  authSuccess: [],
  authFailure: ['error'],
  logoutRequest: null,
  logoutSuccess: null,
  tokenLoad: [],
  tokenLoadSuccess: [],
  saveAuthToken: ['authToken']
})

export const AuthTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  loading: false,
  success: false,
  error: null,
  authToken: null
})

export const request = (state) => state.merge({ fetching: true, success: false })

export const success = (state) => (
  state.merge({ fetching: false, error: null, success: true })
)

export const failure = (state, { error }) => state.merge({ fetching: false, error })

// we're attempting to load token from startup sagas
export const load = (state) => state.merge({ loading: true })
export const loadSuccess = (state) => state.merge({ loading: false })
export const saveToken = (state, { authToken }) => state.merge({ authToken })

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
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.SAVE_AUTH_TOKEN]: saveToken,
});