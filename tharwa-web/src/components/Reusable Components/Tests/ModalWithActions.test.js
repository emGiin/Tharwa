import React from "react";
import { shallow } from "enzyme";

import ModalWithActions, { Footer } from "../ModalWithActions";

describe("<ModalWithActions />", () => {
  let wrapper;
  let footerContent;
  let mockprops = {
    body: () => <div>Mock body</div>,
    record: {test: "test"},
    loading: false,
    handleValidate: jest.fn(),
    handleConfirmReject: jest.fn()
  };

  beforeAll(() => {
    wrapper = shallow(<ModalWithActions {...mockprops} />);
    footerContent = Footer(mockprops);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should shallow without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("'s footer should have two buttons", () => {
    
    expect(footerContent).toHaveLength(2);
  });

  it("should have child modal", () => {
    expect(wrapper.find("Modal")).toHaveLength(1);
  });

  it("should have child body",()=>{
    let Body = mockprops.body;
    expect(wrapper.find("body")).toHaveLength(1); 
    expect(wrapper.find("body").html()).toBe(shallow(<Body/>).html()); 
  })

  it("should call right function on Validate or Reject", ()=> {
    let Footer = ()=><div>{footerContent}</div>
    let footerWrapper = shallow(<Footer/>)
    footerWrapper.find("Button").first().simulate("click")
    expect(mockprops.handleConfirmReject).toBeCalledWith(mockprops.record)
    footerWrapper.find("Button").last().simulate("click")
    expect(mockprops.handleValidate).toBeCalledWith(mockprops.record)
  }); 

  it("should show loading spinner on loading=true", ()=> { 
    wrapper.setProps({loading: true});
    expect(wrapper.find("LoadingSpinner")).toHaveLength(1);
  })

});
