import React, { Component } from 'react';
import { shallow, mount } from "enzyme";

import MenuLeft from '../menuLeft';

describe("<MenuLeft />",()=>{
let eta ;
let spy;
let btn;
let wrapper;

beforeAll(() => {
  //spy = jest.fn();
  wrapper = mount(<MenuLeft  />);
btn = wrapper.find('Button');
});

beforeEach(() => {
  jest.resetAllMocks();
});

it(" should change state onclick on button toggle " ,()=>{
  btn.simulate("click");
 // expect(spy).toHaveBeenCalled();
});


});