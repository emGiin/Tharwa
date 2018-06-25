import React from 'react';

import OtherAccountModal from './OtherAccountModal';//Create a modal
import { TableWithActions, RoundedImage } from '../Reusable Components';

const INITIAL_STATE = {
  selectedRecord: {client:{}},
  isModalVisible: false
};

const columns = [
  {
    title: '',
    dataIndex: 'client',
    key: 'picture',
    render: text => (
      <span>
        <RoundedImage uri={text.picture} height="50px" />
      </span>
    )
  },
  {
    title: 'Nom',
    dataIndex: 'client',
    key: 'Nom',
    render: text => (
      <span>
        {text.lastname}
      </span>
    )
  },
  {
    title: 'Prénom',
    dataIndex: 'client',
    key: 'firstename',
    render: text => (
      <span>
        {text.firstname}
      </span>
    )
  },
  {
    title: 'E-mail',
    dataIndex: 'client',
    key: 'email',
    render: text => (
      <span>
        {text.email}
      </span>
    )
  },
  {
    title: 'Type',
    dataIndex: 'type_id',
    key: 'type_id',
    render: text => (
      <span>
        {{
          EPARN: "Epargne",
          DVEUR: "Devise Euro",
          DVUSD: "Devise Dollar"
        }[text]}
      </span>
    )
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
    modal={OtherAccountModal}
    columns={columns}
    dataSource={props.list}
    fetching={props.fetching}
    {...props}
  />
);
