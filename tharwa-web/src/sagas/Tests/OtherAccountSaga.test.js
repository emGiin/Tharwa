import { call, put } from 'redux-saga/effects';

import FixtureAPI from '../../services/FixtureAPI';
import { getDataset, acceptDemand, rejectDamand } from '../OtherAccountSaga';
import Actions from '../../redux/OtherAccountRedux';

const stepper = fn => mock => fn.next(mock).value;

describe('Other accounts saga', () => {
  it('should be able to get dataset', () => {
    const response = FixtureAPI.accounts.getDataset();

    const step = stepper(getDataset(FixtureAPI));

    expect(step(response)).toEqual(call(FixtureAPI.accounts.getDataset));
    expect(step(response)).toEqual(put(Actions.datasetSuccess()));
    expect(step(response)).toEqual(put(Actions.saveDataset(response.data)));
  });

  it('should be able accept demand', () => {
    const response = FixtureAPI.accounts.action({ id: 7, code: 1 });

    const step = stepper(acceptDemand(FixtureAPI, { id: 7 }));

    expect(step(response)).toEqual(
      call(FixtureAPI.accounts.action, { id: 7, code: 1 })
    );
    expect(step(response)).toEqual(put(Actions.actionSuccess()));
    expect(step(response)).toEqual(put(Actions.datasetRequest()));
  });

  it('should be able reject demand', () => {
    const response = FixtureAPI.accounts.action({ id: 7, code: 0 });

    const step = stepper(rejectDamand(FixtureAPI, { id: 7 }));

    expect(step(response)).toEqual(
      call(FixtureAPI.accounts.action, { id: 7, code: 0 })
    );
    expect(step(response)).toEqual(put(Actions.actionSuccess()));
    expect(step(response)).toEqual(put(Actions.datasetRequest()));
  });
});
