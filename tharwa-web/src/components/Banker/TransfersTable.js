import React from 'react';

import TransferDetailsModal from './TransferDetailsModal';
import { TableWithActions } from '../Reusable Components';

const INITIAL_STATE = {
  selectedRecord: {source_id:{},destination_id:{}},
  isModalVisible: false
};

const columns = [
  {
    title: 'Emetteur',
    dataIndex: 'source_id',
    key: 'source_id',
    render: text => (
      <span>
        {`${text.firstname} ${text.lastname}`}
        <br />
        {text.account}
      </span>
    )
  },
  {
    title: 'Destinataire',
    dataIndex: 'destination_id',
    key: 'destination_id',
    render: text => (
      <span>
        {`${text.firstname} ${text.lastname}`}
        <br />
        {text.account}
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
    dataSource={props.list.map(({ code, ...transfer }) => {
      return { id: code, code, ...transfer };
    })}
    fetching={props.fetching}
    {...props}
  />
);
