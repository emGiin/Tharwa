import React from 'react';
import {shallow} from 'enzyme';
import configureStore from "redux-mock-store";


import App from '../App';

describe('<App>', () => {
  let wrapper, store,dispatcherSpy,content; 
  const mockStore = configureStore();
  const initialState = {
    auth: {
      fetching: false,
      error: null,
      success: false
    },
    pinCode: {
      fetching: false,
      error: null,
      success: false
    }
  };
  beforeAll(() => {
    store = mockStore(initialState);
    dispatcherSpy = jest.spyOn(store, "dispatch");
    wrapper = shallow(<App />, { context: { store } });
    content = wrapper.dive();
  });


  it('should render without crashig', ()=>{
    expect(wrapper).toHaveLength(1);
  });

  // it('should have a provider with redux store', ()=>{
  //   let provider = wrapper.find('Provider');
  //   expect(provider).toHaveLength(1);
  //   expect(provider.prop('store')).toBe(store);
  // })
});