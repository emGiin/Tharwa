import { call,put} from "redux-saga/effects";
import statsActions from "../redux/StatsRedux";

export function* get_stats(api){

  const response = yield call(api.GET_stats_api)
  
  console.log('statSagas , getStatssss>> nbvirement:::')
  console.log(response.data.nbVirement);
  console.log('statSagas , getStatssss>> data:::')
  console.log(response.data);
if(response.ok){
  console.log('repsonde ok')
  const info=response.data
  yield put(statsActions.save(response.data.nbVirement, response.data.nbInscription, response.data.nbOpeation, response.data.nbCommission));
}else console.log('no response')


}
