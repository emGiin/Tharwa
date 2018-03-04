import React from "react";
import { shallow } from "enzyme";

import ConfirmationMethodPrompt from "../ConfirmationMethodPrompt";

describe("ConfirmationMethodPromt", () => {
  let spy;
  let wrapper;

  beforeAll(() => {
    spy = jest.fn();
    wrapper = shallow(<ConfirmationMethodPrompt onNext={spy} />);
  });

  it("should render without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should have a RadioGroup with 2 options", () => {
    expect(wrapper.find("RadioGroup")).toHaveLength(1);
    expect(wrapper.find("RadioGroup").find("Radio")).toHaveLength(2);
  });

  it("should have a next button", () => {
    expect(wrapper.find("Button")).toHaveLength(1);
  });

  it("should call OnNext() after clicking Next button", () => {
    wrapper.find("Button").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("should change state on radio button select", () => {
    wrapper.find('RadioGroup').simulate('change', {target : {value : 1}});
    expect(wrapper.state().choice).toEqual(1);
    wrapper.find('RadioGroup').simulate('change', {target : {value : 2}});
    expect(wrapper.state().choice).toEqual(2);
  });
});
