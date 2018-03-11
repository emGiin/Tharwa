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

