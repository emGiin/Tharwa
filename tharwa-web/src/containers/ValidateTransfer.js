import TableContainer from './TableContainer';
import ValidateActions from '../redux/ValidateTransferRedux';
import { TransfersTable } from '../components/Banker';

export default TableContainer(TransfersTable, ValidateActions, 'validateTransfer');
