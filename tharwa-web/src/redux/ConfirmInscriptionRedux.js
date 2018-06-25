import createReducer from './TableWithActionsRedux';


export const prefix = 'INSCRIPTIONS'
const {reducer, Types, Creators} = createReducer(prefix);

export {reducer , Types as ConfirmInscriptionTypes};
export default Creators;