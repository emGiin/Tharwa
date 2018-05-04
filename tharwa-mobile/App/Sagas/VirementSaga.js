import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import VirementActions from '../Redux/VirementRedux'




// attempts to transfert
export function* virement(api, {method, amount}) {
  const transObj = {
    method: method,
    amount: amount
  
  }

  const response = yield call(api.virement, transObj)

  // success?
  if (response.ok) {
    yield put(VirementActions.VirementSuccess())
    
  } else {
    yield put(VirementActions.VirementFailure(I18n.t('virementDialogDescriptionErreur')))
  }
}

