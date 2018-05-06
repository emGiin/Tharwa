import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  pinCodeRequest: ['pinCode'],
  pinCodeSuccess: [],
  pinCodeFailure: ['error'],
  pinCodeReset: [],
  savePinCodeToken: ['token', 'code']
})

export const PinCodeTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  loading: false,
  success: false,
  error: null,
  token: null,
  code: null
})

export const request = (state) => state.merge({ fetching: true, success: false })

export const failure = (state, { error }) => state.merge({ fetching: false, error })

export const success = (state) => (
  state.merge({ fetching: false, error: null, success: true })
)

export const save = (state, { token, code }) =>
  state.merge({ token, code })

export const reset = state => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PIN_CODE_REQUEST]: request,
  [Types.PIN_CODE_SUCCESS]: success,
  [Types.PIN_CODE_FAILURE]: failure,
  [Types.PIN_CODE_RESET]: reset,
  [Types.SAVE_PIN_CODE_TOKEN]: save,
});