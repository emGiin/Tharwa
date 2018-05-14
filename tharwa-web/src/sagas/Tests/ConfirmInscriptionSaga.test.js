import { call, put, select } from 'redux-saga/effects';

import FixtureAPI from '../../services/FixtureAPI';
import {
  getDataset,
  acceptDemand,
  rejectDamand
} from '../ConfirmInscriptionSaga';
import Actions from '../../redux/ConfirmInscriptionRedux';

const stepper = fn => mock => fn.next(mock).value;

describe('Confirm inscriptions saga', () => {
  it('should be able to get dataset', () => {
    // const response = FixtureAPI.inscriptions.getDataset();

    // const step = stepper(getDataset(FixtureAPI));

    // expect(step(response)).toEqual(call(FixtureAPI.inscriptions.getDataset));
    // expect(step(response)).toEqual(put(Actions.datasetSuccess()));
    // expect(step(response)).toEqual(put(Actions.saveDataset(response.data)));
  });

  it('should be able accept demand', () => {
    // const response = FixtureAPI.inscriptions.action({ id: 7, code: 1 });

    // const step = stepper(acceptDemand(FixtureAPI, { id: 7 }));

    // expect(step(response)).toEqual(
    //   call(FixtureAPI.inscriptions.action, { id: 7, code: 1 })
    // );
    // expect(step(response)).toEqual(put(Actions.actionSuccess()));
    // expect(step(response)).toEqual(put(Actions.datasetRequest()));
  });

  it('should be able reject demand', () => {
    // const response = FixtureAPI.inscriptions.action({ id: 7, code: 0 });

    // const step = stepper(rejectDamand(FixtureAPI, { id: 7 }));

    // expect(step(response)).toEqual(
    //   call(FixtureAPI.inscriptions.action, { id: 7, code: 0 })
    // );
    // expect(step(response)).toEqual(put(Actions.actionSuccess()));
    // expect(step(response)).toEqual(put(Actions.datasetRequest()));
  });
});
