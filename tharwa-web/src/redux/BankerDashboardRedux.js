import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  nbreRequest: [],
  nbreSuccess: [],
  nbreFailure: ["error"],
  saveNbre: ["counts"]
});

export const BankerDashboardTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  nbreFetching: false,
  nbreSuccess: false,
  nbrError: null,
  nbreInscriptions: null,
  nbreAutresComptes: null,
  nbreVirements: null
});

export const request = state => state.merge({ nbreFetching: true, nbreSuccess: false });

export const failure = (state, { error }) =>
  state.merge({ nbreFetching: false, nbreError:error });
export const success = state =>
  state.merge({ nbreFetching: false, nbreError: null, nbreSuccess: true });

export const save = (state,{counts}) => state.merge({ 
   nbreInscriptions:counts.nbreInscriptions, 
   nbreAutresComptes: counts.nbreAutresComptes, 
   nbreVirements: counts.nbreVirements});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NBRE_REQUEST]: request,
  [Types.NBRE_SUCCESS]: success,
  [Types.NBRE_FAILURE]: failure,
  [Types.SAVE_NBRE]: save
});
