import createReducer from './TableWithActionsRedux';

export const prefix = 'OTHERACCOUNT';
const { reducer, Types, Creators } = createReducer(prefix);

export { reducer, Types as OtherAccountTypes };
export default Creators;
