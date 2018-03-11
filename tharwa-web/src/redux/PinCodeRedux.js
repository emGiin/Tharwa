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
