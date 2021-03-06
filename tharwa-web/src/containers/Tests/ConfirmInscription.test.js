import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ConfirmInscription from '../ConfirmInscription';

describe('<ConfirmInscription/>', () => {
  let wrapper, store;
  const mockStore = configureStore();
  const initialState = {
    confirmInscription: {
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
    wrapper = shallow(<ConfirmInscription />, { context: { store } });
  });

  it('should render without crashig', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should have props matching initial state', () => {
    const { dataset, action } = initialState.confirmInscription;
    expect(wrapper.prop('dataset').fetching).toEqual(dataset.fetching);
    expect(wrapper.prop('dataset').error).toEqual(dataset.error);
    expect(wrapper.prop('dataset').success).toEqual(dataset.success);
    expect(wrapper.prop('actionState').fetching).toEqual(action.fetching);
    expect(wrapper.prop('actionState').error).toEqual(action.error);
    expect(wrapper.prop('actionState').success).toEqual(action.success);
  });
});
