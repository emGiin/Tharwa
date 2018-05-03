import React from "react";
import { shallow } from "enzyme";

import TableWithActions from "../TableWithActions";

describe("<TableWithActions />", () => {
  let wrapper;
  let mockprops = {
    initialState: {},
    modal: () => <div />,
    columns: [],
    dataSource: [],
    fetching: false,
    actionState: {},
    acceptDemand: jest.fn()
  };

  beforeAll(() => {
    wrapper = shallow(<TableWithActions {...mockprops} />);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should shallow without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should have correct initial state", () => {
    expect(wrapper.state()).toMatchObject(mockprops.initialState);
  });
  it("should have custom modal as child", () => {
    expect(wrapper.find("modal")).toHaveLength(1);
  });

  it("should have custom Table as child", () => {
    expect(wrapper.find("Table")).toHaveLength(1);
  });

  it("should should has actions column", () => {
    expect(wrapper.instance().actionsColumn).toBeTruthy();
  });

  it("should call acceptDemand on validation handler", ()=>{
    let record = {id: "test"}
    wrapper.instance().handleValidate(record);
    expect(mockprops.acceptDemand).toBeCalledWith(record.id);
  })
});
