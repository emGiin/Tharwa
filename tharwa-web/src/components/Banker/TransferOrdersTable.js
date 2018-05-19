import React, { Component } from 'react';
import { RoundedImage } from '../Reusable Components';
import { Table, Icon, Tooltip } from 'antd';

class TransferOrdersTable extends Component{
 
  render(){
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
        title: 'Numéro de compte',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Date',
        dataIndex: 'created_at',
        key: 'created_at'
      },
      {
        title:'',
        key:'action',
        render: (text, record) => (
          <span>
            <Tooltip title="Détails ">
            <a onClick={() => this.props.showDetails(record)}>
              Voir les détails <Icon type="right" />
            </a>
          </Tooltip>
          </span>
        )
      }
    ];
    return(
      <Table
          columns={columns}
          rowKey={record => record.email}
          dataSource={this.state.data}
          pagination={{pageSize:5, size: "small"}}
          loading={this.props.listState.fetching}
        />
    )
  }

}
export default TransferOrdersTable;