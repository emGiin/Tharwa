import ValidateTransferActions from '../redux/ValidateTransferRedux';
import createSaga from './TableWithActionsSaga';

export let { getDataset, acceptDemand, rejectDamand } = createSaga(
  ValidateTransferActions, 'virements'
);
