import { call, put, select } from "redux-saga/effects";
import banquierActions from "../redux/banquierRedux";
import {Modal} from 'antd';


export function* register(api, { nom,prenom, email,password, adress, phone }) {
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

    Modal.success({
      title: 'Success',
      content: 'le compte banquier est creé avec succès',
    });

    yield put(banquierActions.createDone());
    console.log("done");
  } else {
    console.log("erreur dans creation ");
    yield put(banquierActions.createError("erreur dans la creation "));
  }
}


