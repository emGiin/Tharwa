import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";




const INITIAL_STATE = Immutable({
  list:[],
  fetching: false,
  success: false,
  error: null
});
