import { combineReducers } from 'redux';
import createStore from './CreateStore'
import rootSaga from '../sagas/'

const reducers = combineReducers({
  auth: require('./AuthRedux').reducer,
  pinCode: require('./PinCodeRedux').reducer,
  confirmInscription:require('./ConfirmInscriptionRedux').reducer
});


export default () => {
  let { store , sagasManager, sagaMiddleware  } = createStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
