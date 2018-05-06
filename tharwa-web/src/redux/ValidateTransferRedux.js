import createReducer from './TableWithActionsRedux';


export const prefix = 'TRANSFERS'
const {reducer, Types, Creators} = createReducer(prefix);

export {reducer , Types as ValidateTransferTypes};
export default Creators;

