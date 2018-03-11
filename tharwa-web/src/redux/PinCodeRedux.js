import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  pinCodeRequest: ["pinCode"],
  pinCodeSuccess: [],
  pinCodeFailure: ["error"],
  savePinCodeToken: ["pinCodeToken"]
});

export const PinCodeTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  fetching: false,
  loading: false,
  success: false,
  error: null,
  pinCodeToken: null
});

export const request = state => state.merge({ fetching: true, success: false });

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error });
export const success = state =>
  state.merge({ fetching: false, error: null, success: true });

export const save = (state, { pinCodeToken }) => state.merge({ pinCodeToken });
