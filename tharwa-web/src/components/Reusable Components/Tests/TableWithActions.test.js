import React from 'react';
import { shallow } from 'enzyme';

import TableWithActions from '../TableWithActions';

describe('<TableWithActions />', () => {
  let wrapper, wrapperInstance, record;
  let mockprops = {
    initialState: {},
    modal: () => <div />,
    columns: [],
    dataSource: [],
    fetching: false,
    actionState: {},
    acceptDemand: jest.fn(),
    rejectDemand: jest.fn(),
    setDefault: jest.fn()
  };

  beforeAll(() => {
    wrapper = shallow(<TableWithActions {...mockprops} />);
    wrapperInstance = wrapper.instance();
    record = { id: 'test' };
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  // it("should not mount without minimal props", ()=> {
  //   const temp = console.error
  //   console.error = jest.fn();
  //   shallow(<TableWithActions />)
  //   expect(console.error).toBeCalled()
  //   console.error = temp;
  // })

  it('should shallow without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should recieve initial state', () => {
    expect(wrapper.state()).toBe(mockprops.initialState);
  });

  it('should have an action column', () => {
    expect(
      shallow(wrapperInstance.actionsColumn.render()).find('Tooltip')
    ).toHaveLength(3);
    expect(wrapperInstance.columns).toEqual([
      ...mockprops.columns,
      wrapperInstance.actionsColumn
    ]);
  });

  it('should call setDefault before unmounting', () => {
    wrapperInstance.componentWillUnmount();
    expect(mockprops.setDefault).toBeCalled();
  });

  it('should have correct initial state', () => {
    expect(wrapper.state()).toMatchObject(mockprops.initialState);
  });
  it('should have custom modal as child', () => {
    expect(wrapper.find('modal')).toHaveLength(1);
  });

  it('should have custom Table as child', () => {
    expect(wrapper.find('Table')).toHaveLength(1);
  });

  it('should should has actions column', () => {
    expect(wrapper.instance().actionsColumn).toBeTruthy();
  });

  it('should call acceptDemand on validation handler', () => {
    wrapper.instance().handleValidate(record);
    expect(mockprops.acceptDemand).toBeCalledWith(record.id);
  });

  it('should set correct state on showModal', () => {
    wrapperInstance.showModal(record);
    expect(wrapper.state()).toEqual({
      selectedRecord: record,
      isModalVisible: true
    });
  });

 
});
