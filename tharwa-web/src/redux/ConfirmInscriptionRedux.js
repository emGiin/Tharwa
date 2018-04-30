import createReducer from './TableWithActionsRedux';

const {reducer, Types, Creators} = createReducer('INSCRIPTIONS');

export {reducer , Types as ConfirmInscriptionTypes};
export default Creators;