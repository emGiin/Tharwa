import React from 'react';

import ApplicantDetailsModal from './ApplicantDetailsModal';
import { TableWithActions, RoundedImage } from '../Reusable Components';

const INITIAL_STATE = {
  selectedRecord: {},
  isModalVisible: false
};

const columns = [
  {
    title: '',
    dataIndex: 'picture',
    key: 'picture',
    render: text => (
      <span>
        <RoundedImage uri={text} height="50px" />
      </span>
    )
  },
  {
    title: 'Nom',
    dataIndex: 'lastname',
    key: 'lastname'
  },
  {
    title: 'Prénom',
    dataIndex: 'firstname',
    key: 'firstename'
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Date',
    dataIndex: 'created_at',
    key: 'created_at'
  }
];

export default props => (
  <TableWithActions
    initialState={INITIAL_STATE}
    modal={ApplicantDetailsModal}
    columns={columns}
    dataSource={props.list.map(({ email, ...user }) => {
      return { id: email, email, ...user };
    })}
    fetching={props.fetching}
    {...props}
  />
);
