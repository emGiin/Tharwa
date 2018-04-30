import React from "react";
import { shallow } from "enzyme";

import TransfersTable from "../TransfersTable" 

describe("TransfersTable", () => {
  let spySetDefault;
  let spyReject;
  let spyAccept;
  let actionStateMock;
  let wrapper;
  let table;
  let l=require('../../../fixtures/TransfersList.json')
  beforeAll(() => {
    spySetDefault = jest.fn();
    spyAccept=jest.fn();
    spyReject=jest.fn();
    wrapper = shallow(<TransfersTable  
      setDefault={spySetDefault} 
      actionState={actionStateMock} 
      rejectDemand={spyReject} 
      acceptDemand={spyAccept} 
      list={l}
       />);
    table=wrapper.find('TableWithActions')
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });
    
  it("should have 1 table", () => {
    expect(table).toHaveLength(1);
  });

});