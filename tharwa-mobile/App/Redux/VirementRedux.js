import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  virementRequest: ['method', 'amount'],
  virementFailure: ['error'],
  virementSuccess: [],

})

export const VirementTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  loading: false,
  success: false,
  error: null

})

export const request = state => state.merge({ fetching: true, success: false })

export const success = state => (
  state.merge({ fetching: false, error: null, justif: null, success: true })
)

export const failure = (state, { error }) => state.merge({ fetching: false, error })
export const reducer = createReducer(INITIAL_STATE, {
  [Types.VIREMENT_REQUEST]: request,
  [Types.VIREMENT_SUCCESS]: success,
  [Types.VIREMENT_FAILURE]: failure

});