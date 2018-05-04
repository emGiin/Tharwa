import { call, put } from "redux-saga/effects";
import statsActions from "../redux/StatsRedux";

export function* get_NbV(api){

  console.log('statSagas , getnbV :::')

  const response = yield call(api.getNbV);

if(response.ok){
  yield put(statsActions.setNbV(response.data.nbV));
}

}
