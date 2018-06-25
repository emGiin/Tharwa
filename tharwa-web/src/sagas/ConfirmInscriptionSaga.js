import ConfirmInscriptionActions from '../redux/ConfirmInscriptionRedux';
import createSaga from './TableWithActionsSaga';

export let { getDataset, acceptDemand, rejectDamand } = createSaga(
  ConfirmInscriptionActions, 'inscriptions'
)