import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import TableContainer from '../TableContainer';
import TableWithActionsRedux from '../../redux/TableWithActionsRedux';

describe('<TableContainer />', () => {
  let wrapper, store, dispatcherSpy, content, actionsMock;
  const mockStore = configureStore();
  const CustomTable = () => <table />;
  const initialState = {
    mockReducer: {
      dataset: {
        list: [],
        fetching: false,
        success: false,
        error: null
      },
      action: {
        fetching: false,
        success: false,
        error: null
      }
    }
  };
  beforeAll(() => {
    store = mockStore(initialState);
    actionsMock = TableWithActionsRedux('MOCK').Creators;
    dispatcherSpy = jest.spyOn(store, 'dispatch');
    const Container = TableContainer(CustomTable, actionsMock, 'mockReducer');
    wrapper = shallow(<Container />, { context: { store } });
    content = wrapper.dive();
  });

  it('should render without crashig', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should have props matching initial state', () => {
    const { dataset, action } = initialState.mockReducer;
    expect(wrapper.prop('dataset').fetching).toEqual(dataset.fetching);
    expect(wrapper.prop('dataset').error).toEqual(dataset.error);
    expect(wrapper.prop('dataset').success).toEqual(dataset.success);
    expect(wrapper.prop('actionState').fetching).toEqual(action.fetching);
    expect(wrapper.prop('actionState').error).toEqual(action.error);
    expect(wrapper.prop('actionState').success).toEqual(action.success);
  });

  it('should dispatch through props', () => {
    wrapper.prop('getDataset')();
    expect(dispatcherSpy).toHaveBeenCalledWith(actionsMock.datasetRequest());
    wrapper.prop('rejectDemand')(15);
    expect(dispatcherSpy).toHaveBeenCalledWith(actionsMock.rejectDemand(15));
    wrapper.prop('acceptDemand')(23);
    expect(dispatcherSpy).toHaveBeenCalledWith(actionsMock.acceptDemand(23));
    wrapper.prop('setDefault')();
    expect(dispatcherSpy).toHaveBeenCalledWith(actionsMock.setDefault());
  });

  it('should have child TableHolder', () => {
    expect(content.find('TableHolder')).toHaveLength(1);
  });

  it('should request dataset before mounting', () => {
    content
      .dive()
      .instance()
      .componentWillMount();
    expect(dispatcherSpy).toHaveBeenCalledWith(actionsMock.datasetRequest());
  });

  it('should have CustomTable as child', () => {
    expect(content.dive().html()).toBe(shallow(<CustomTable />).html());
  });
});
