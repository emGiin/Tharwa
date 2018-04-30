import React from "react";
import { shallow } from "enzyme";

import TransfersDetailsModal from "../TransferDetailsModal"

describe("<TransfersDetailsModal>",()=>{
  let wrapper;
  let record={}

  beforeAll(() => {
    wrapper = shallow(<TransfersDetailsModal record={record} />);
  });
});