import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  signupRequest: [
    'email',
    'password',
    'lastName',
    'firstName',
    'phone',
    'address',
    'function',
    'type_',
    'picture',
  ],
  signupSuccess: [],
  signupFailure: ['error'],
})

export const SignupTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  loading: false,
  success: false,
  error: null
})

export const request = (state) => state.merge({ fetching: true, success: false })

export const success = (state) => (
  state.merge({ fetching: false, error: null, success: true })
)

export const failure = (state, { error }) => state.merge({ fetching: false, error })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: request,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure
});