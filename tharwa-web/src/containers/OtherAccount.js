import TableContainer from './TableContainer';
import OtherAccountActions from '../redux/OtherAccountRedux';
import { OtherAccountTable } from '../components/Banker';

export default TableContainer(OtherAccountTable, OtherAccountActions, 'otherAccount');
