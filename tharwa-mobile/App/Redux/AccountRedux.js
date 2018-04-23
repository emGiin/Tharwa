import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  accountRequest: [],
  accountFailure: ['error'],
  accountSuccess: ['account'],
  saveAccountType: ['accountType']
})

export const AccountTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  fetching: false,
  loading: false,
  success: false,
  error: null,
  accountType: null,
  information: null
})

export const request = state => state.merge({ fetching: true, success: false })

export const success = (state, { information }) => (
  state.merge({ fetching: false, error: null, success: true, information })
)

export const failure = (state, { error }) => state.merge({ fetching: false, error })

export const saveAccountType = (state, { accountType }) => state.merge({ accountType })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.SAVE_ACCOUNT_TYPE]: saveAccountType,
});