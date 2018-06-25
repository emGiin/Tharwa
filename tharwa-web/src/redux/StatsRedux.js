import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";



const { Types, Creators } = createActions({
  getNbVirement: [],
  setNbV: ["nb"],
  setStats: [],
  save: ["nbV", "nbInsc", "data_op", "data_com"]
});

export const statsTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  featching: true,
  nbV: 9,
  nbV_detail: [],
  nbI: 9,
  nbI_detail: [],
  data_op: { mois: [], annee: [], trimestre: [] },
  data_com: {mois: [], annee: [], trimestre: []},
  stats_info: null
});

export const getNbV = state => {
 var temp = state.merge({ featching: false })
  console.log('hello status redux:get ::' + temp.nbV)
  return temp
}

export const setNbV = (state, { nb }) => {
  var tmp = state.merge({ nbV: nb })
  return tmp
}


export const setStats = (state, { stats_data }) => {
  var tmp = state.merge({ stats_info: stats_data })
  return tmp
}

export const saveStats = (state, { nbV, nbInsc, data_op, data_com }) => {
  var tmp = state.merge({
    nbV: nbV.total,
    nbV_detail: nbV.detail,
    nbI: nbInsc.total,
    nbI_detail: nbInsc.detail,
    data_op: data_op,
    data_com: data_com
  })
  /*console.log('hello  redux,,,saving stats ... nbInscription:')
  console.log(nbInsc)
  console.log('hello  redux,,,saving stats ... data op:')
  console.log(tmp.data_op)*/
  return tmp
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NB_VIREMENT]: getNbV,
  [Types.SET_NB_V]: setNbV,
  [Types.SET_STATS]: setStats,
  [Types.SAVE]: saveStats,
});