import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";



const { Types, Creators } = createActions({
  createBanquier:["nom","prenom","mail","password","adress","phone"],
  createError:["message"],
  createDone:[]
});

export const newBanquierTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  invalidInput:false,
  done:false,
  loading: false,
  success: false,
  error: null,
  dataUser:null
});

export const creer = state => {
  var temp =  state.merge({ loading: true, success: false, error: null });
  console.log('in redux received Data : '+temp);
  return temp
  }

export const done = state =>
  state.merge({ done: true, invalidInput: false });
export const error = (state, { error }) =>
  state.merge({ invalidInput: true, error });

export const show = () => console.log("show test");

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_BANQUIER]: creer,
  [Types.CREATE_DONE]: done,
  [Types.CREATE_ERROR]: error
});