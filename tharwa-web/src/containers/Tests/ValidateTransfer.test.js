import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ValidateTransfer from '../ValidateTransfer';

describe('<ValidateTransfer/>', () => {
  let wrapper, store;
  const mockStore = configureStore();
  const initialState = {
    validateTransfer: {
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
    wrapper = shallow(<ValidateTransfer />, { context: { store } });
  });

  it('should render without crashig', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should have props matching initial state', () => {
    const { dataset, action } = initialState.validateTransfer;
    expect(wrapper.prop('dataset').fetching).toEqual(dataset.fetching);
    expect(wrapper.prop('dataset').error).toEqual(dataset.error);
    expect(wrapper.prop('dataset').success).toEqual(dataset.success);
    expect(wrapper.prop('actionState').fetching).toEqual(action.fetching);
    expect(wrapper.prop('actionState').error).toEqual(action.error);
    expect(wrapper.prop('actionState').success).toEqual(action.success);
  });
});
