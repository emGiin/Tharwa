import { call, put, select } from "redux-saga/effects";
import banquierActions from "../redux/banquierRedux";
import {Modal} from 'antd';


export function* register(api, { nom,prenom, email,password, adress, phone }) {
  const body = {
    firstName:nom,
    lastName:prenom,
    password:password,
    email:email,
    address:adress,
    phone:phone
  };
  var str = JSON.stringify(body)
console.log("je suis dans saga avec :data =");
console.log(str)

  const response = yield call(api.register_banquier, str);
const saved = response.data.saved

  if (saved) {
    Modal.success({
      title: 'Success',
      content: 'le compte banquier est creé avec succès',
    });

    yield put(banquierActions.createDone());
    console.log("done");
  } else {
    console.log("erreur dans creation , la reponse :");
    console.log(response.data);
    var log = 'une erreur s\'est produit:'+JSON.stringify(response.data)
    Modal.error({
      title: 'erreur',
      content: log,
    });
    
    yield put(banquierActions.createError("erreur dans la creation "));
  }
}


