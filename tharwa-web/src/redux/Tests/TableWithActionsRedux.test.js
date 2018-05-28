import createReducer, { INITIAL_STATE } from '../TableWithActionsRedux';

describe('Table with actions REDUX', () => {
  const { reducer, Creators: Actions } = createReducer('MOCK');

  it('should handle dataset request', () => {
    const state = reducer(INITIAL_STATE, Actions.datasetRequest());

    expect(state.dataset.fetching).toBe(true);
    expect(state.dataset.success).toBe(false);
    expect(state.dataset.error).toBeNull();
  });

  it('should handle dataset success', () => {
    const state = reducer(INITIAL_STATE, Actions.datasetSuccess());

    expect(state.dataset.fetching).toBe(false);
    expect(state.dataset.success).toBe(true);
    expect(state.dataset.error).toBeNull();
  });

  it('should handle dataset failure', () => {
    const state = reducer(INITIAL_STATE, Actions.datasetFailure('error'));

    expect(state.dataset.fetching).toBe(false);
    expect(state.dataset.success).toBe(false);
    expect(state.dataset.error).toBe('error');
  });

  it('should save dataset', () => {
    const list = [1, 2, 3];
    const state = reducer(INITIAL_STATE, Actions.saveDataset(list));

    expect(state.dataset.list).toMatchObject(list);
  });

  it('should handle action request', () => {
    const recordID = 412;
    let state = reducer(INITIAL_STATE, Actions.acceptDemand(recordID));

    expect(state.action.fetching).toBe(true);
    expect(state.action.success).toBe(false);
    expect(state.action.error).toBeNull();

    state = reducer(INITIAL_STATE, Actions.rejectDemand(recordID));

    expect(state.action.fetching).toBe(true);
    expect(state.action.success).toBe(false);
    expect(state.action.error).toBeNull();
  });

  it('should handle action success', () => {
    const state = reducer(INITIAL_STATE, Actions.actionSuccess());

    expect(state.action.fetching).toBe(false);
    expect(state.action.success).toBe(true);
    expect(state.action.error).toBeNull();
  });

  it('should handle action failure', () => {
    const state = reducer(INITIAL_STATE, Actions.actionFailure('error'));

    expect(state.action.fetching).toBe(false);
    expect(state.action.success).toBe(false);
    expect(state.action.error).toBe('error');
  });

  it("should reset state on setDefault", ()=>{
    const state = reducer(INITIAL_STATE, Actions.setDefault());
    
    expect(state.action.success).toBe(false);
    expect(state.action.error).toBeNull();
  })
});
