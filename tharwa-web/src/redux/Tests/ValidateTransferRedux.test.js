import Actions, {
  reducer,
  ValidateTransferTypes,
  prefix
} from '../ValidateTransferRedux';

describe('ValidateTransfer REDUX', () => {
  it('should export default actions', () => {
    expect(typeof Actions.datasetRequest).toBe('function');
    expect(typeof Actions.datasetSuccess).toBe('function');
    expect(typeof Actions.datasetFailure).toBe('function');
    expect(typeof Actions.saveDataset).toBe('function');
    expect(typeof Actions.acceptDemand).toBe('function');
    expect(typeof Actions.rejectDemand).toBe('function');
    expect(typeof Actions.actionSuccess).toBe('function');
    expect(typeof Actions.actionFailure).toBe('function');
    expect(typeof Actions.setDefault).toBe('function');
  });

  it('should export reducer', () => {
    expect(typeof reducer).toBe('function');
  });

  it('should export types', () => {
    for (let type in ValidateTransferTypes) {
      expect(ValidateTransferTypes[type]).toBe(prefix + '/' + type);
    }
  });
});
