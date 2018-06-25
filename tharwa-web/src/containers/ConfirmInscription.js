import TableContainer from './TableContainer';
import ConfirmActions from '../redux/ConfirmInscriptionRedux';
import { RequestsTable } from '../components/Banker';

export default TableContainer(RequestsTable, ConfirmActions, 'confirmInscription');
