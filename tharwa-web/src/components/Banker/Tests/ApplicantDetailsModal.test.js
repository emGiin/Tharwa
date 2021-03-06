import React from 'react';
import { shallow } from 'enzyme';

import ApplicantDetailsModal from '../ApplicantDetailsModal';

describe('<ApplicantDetailsModal />', () => {
  let wrapper;
  let mockprops = {
    record: {}
  };

  beforeAll(() => {
    wrapper = shallow(<ApplicantDetailsModal {...mockprops} />);
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
