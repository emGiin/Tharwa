import createReducer from './TableWithActionsRedux';

const {reducer, Types, Creators} = createReducer('OTHERACCOUNT');

export {reducer , Types as OtherAccountTypes};
export default Creators;

