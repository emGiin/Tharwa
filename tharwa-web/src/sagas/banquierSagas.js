import { call, put, select } from "redux-saga/effects";
import banquierActions from "../redux/banquierRedux";

export function* register(api, { nom,prenom,password, email, adress, phone }) {
  const body = {
    nom:nom,
    prenom:prenom,
    password:password,
    email:email,
    adress:adress,
    phone:phone
  };
console.log("je suis dans saga avec :nom :"+nom+" prenom: "+prenom+" email:"+email+" pass: "+password+" adress : "+adress+" phone: "+phone );
  const response = yield call(api.register_banquier, body);

  if (response.ok) {
    yield put(banquierActions.createDone());
  } else {
    yield put(banquierActions.createError("erreur dans la creation "));
  }
}


