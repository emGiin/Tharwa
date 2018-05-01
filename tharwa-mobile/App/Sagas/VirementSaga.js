import { call, put } from 'redux-saga/effects'
import I18n from 'react-native-i18n'
import VirementActions from '../Redux/VirementRedux'




// attempts to transfert
export function* virement(api, { type1, type2, montant }) {
  const transObj = {
    typeAccount1: type1,
    typeAccount2: type2,
    montant: montant,
    
  }

  const response = yield call(api.virement, transObj)

  // success?
  if (response.ok) {
    yield put(VirementActions.VirementSuccess())
    
  } else {
    yield put(VirementActions.VirementFailure(I18n.t('virementDialogDescriptionErreur')))
  }
}
export function* justification(api, { justif }) {
    const justifObj = {
      
      Justif: justif,
      
    }
  
    const response = yield call(api.justification, justifObj)
  
    // success?
    if (response.ok) {
      yield put(VirementActions.VirementSuccess())
      
    } else {
      yield put(VirementActions.VirementFailure(I18n.t('virementDialogDescriptionErreur')))
    }
  }


