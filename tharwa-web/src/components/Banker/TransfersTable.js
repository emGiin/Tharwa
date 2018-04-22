import React from 'react';

import TransferDetailsModal from './TransferDetailsModal';
import { TableWithActions } from '../Reusable Components';

const INITIAL_STATE = {
  selectedRecord: {},
  isModalVisible: false
};

const columns = [
  {
    title: 'Emetteur',
    dataIndex: 'source_id',
    key: 'source_id',
    render: text => (
      <span>
        <span>
          {text.firstname} {text.lastname}
        </span>
        <br />
        <span>{text.account}</span>
      </span>
    )
  },
  {
    title: 'Destinataire',
    dataIndex: 'destination_id',
    key: 'destination_id',
    render: text => (
      <span>
        <span>
          {text.firstname} {text.lastname}
        </span>
        <br />
        <span>{text.account}</span>
      </span>
    )
  },
  {
    title: 'Montant DZD',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'Date',
    dataIndex: 'transferdate',
    key: 'transferdate'
  }
];

export default props => (
  <TableWithActions
    initialState={INITIAL_STATE}
    modal={TransferDetailsModal}
    columns={columns}
    dataSource={props.list}
    fetching={props.fetching}
    {...props}
  />
);
