import createReducer from './TableWithActionsRedux';

const {reducer, Types, Creators} = createReducer('TRANSFERS');

export {reducer , Types as ValidateTransferTypes};
export default Creators;

