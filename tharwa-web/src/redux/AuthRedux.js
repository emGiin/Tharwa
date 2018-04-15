import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";


// nabdaw premierement par la creaction des actions
// les action li rah ykono asynchrone (generealement les apples vers l'API) ndirolhom 3 action Request Success w Failure
// on definie chaque action m3a les parametre ta3ha
const { Types, Creators } = createActions({
  
  authRequest: ["email", "password", "confirmationMethod"],
  authSuccess: [],
  authFailure: ["error"],
  logoutRequest: null,
  logoutSuccess: null,
  tokenLoad: [],
  tokenLoadSuccess: [],
  saveAuthToken: ["authToken"]
});

export const AuthTypes = Types;
export default Creators;

// apres on creer notre `INITIAL_STATE` (edited)
// bih rahin ndefiniw une partie men Store globale
const INITIAL_STATE = Immutable({
  fetching: false,
  loading: false,
  success: false,
  error: null,
  authToken: null
});

export const request = state => state.merge({ fetching: true, success: false, error: null });

export const success = state =>
  state.merge({ fetching: false, error: null, success: true });
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error });

export const load = state => state.merge({ loading: true });
export const loadSuccess = state => state.merge({ loading: false });
export const saveToken = (state, { authToken }) => state.merge({ authToken });

export const logoutRequest = state => state.merge({ authToken: null });
export const logoutSuccess = state => INITIAL_STATE;


// apres avoir creer les fonction hado
// nroho ndiro la liaisons binhom w bin les actions li dernahom
export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,
  [Types.TOKEN_LOAD]: load,
  [Types.TOKEN_LOAD_SUCCESS]: loadSuccess,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.SAVE_AUTH_TOKEN]: saveToken
});
