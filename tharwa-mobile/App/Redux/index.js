import { combineReducers } from 'redux';
import configureStore from './CreateStore'
// reducer
import { reducer as form } from 'redux-form'
import { reducer as nav } from './NavigationRedux'
import { reducer as auth } from './AuthRedux'
import { reducer as pinCode } from './PinCodeRedux'
import { reducer as signup } from './SignupRedux'
import { reducer as virement } from './VirementRedux'
import { reducer as account } from './AccountRedux'

// saga
import rootSaga from '../Sagas/'

export const reducers = combineReducers({
  form, nav, auth, pinCode, signup, virement, account
});


export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
