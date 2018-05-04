import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";



const { Types, Creators } = createActions({
  getNbVirement:[],
  setNbV:["nb"]
});

export const statsTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  featching:true,
  nbV:9
});

export const getNbV = state =>{
var temp =state.merge({ featching:false})
console.log('hello status redux:get ::'+temp.nbV)
return temp
} 

export const setNbV = (state,{nb}) => {
var tmp =   state.merge({ nbV:nb })
console.log('hello status redux')
return tmp
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NB_VIREMENT]: getNbV,
  [Types.SET_NB_V]: setNbV
});