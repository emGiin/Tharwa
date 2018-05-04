import React from 'react';
import { shallow } from 'enzyme';

import OtherAccountModal from '../OtherAccountModal';

describe('<OtherAccountModal />', () => {
  let wrapper;
  let mockprops = {
    record: {client:{}}
  };

  beforeAll(() => {
    wrapper = shallow(<OtherAccountModal {...mockprops} />);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render without crashing", ()=> {
    expect(wrapper).toHaveLength(1);    
  })

  it("should be instance of Modalwithactions", ()=> {
    expect(wrapper.find('ModalWithActions')).toHaveLength(1);
  })
});
