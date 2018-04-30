import { call, put, select } from "redux-saga/effects";
import banquierActions from "../redux/banquierRedux";
import {Modal} from 'antd';


export function* register(api, { nom,prenom, email,password, adress, phone }) {
  const body = {
    firstName:nom,
    lastName:prenom,
    password:password,
    email:email,
    adress:adress,
    phone:phone
  };
console.log("je suis dans saga avec :data =");
console.log(body)

  const response = yield call(api.register_banquier, body);

  if (response.ok) {

    Modal.success({
      title: 'Success',
      content: 'le compte banquier est creé avec succès',
    });

    yield put(banquierActions.createDone());
    console.log("done");
  } else {
    console.log("erreur dans creation , la reponse :");
    console.log(response);
    Modal.error({
      title: 'erreur',
      content: 'une erreur s\'est produit',
    });
    yield put(banquierActions.createError("erreur dans la creation "));
  }
}


