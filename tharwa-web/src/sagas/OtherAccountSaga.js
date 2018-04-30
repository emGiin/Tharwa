import OtherAccountActions from '../redux/OtherAccountRedux';
import createSaga from './TableWithActionsSaga';

export let { getDataset, acceptDemand, rejectDamand } = createSaga(
  OtherAccountActions, 'accounts'
);