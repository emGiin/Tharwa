import React, { Component } from 'react';
import { RoundedImage } from '../Reusable Components';
import { Table, Icon, Tooltip } from 'antd';

class ClientsTable extends Component{
  columns = [
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
      title: 'Date d\'inscription',
      dataIndex: 'created_at',
      key: 'created_at'
    },
    {
      title:'',
      key:'action',
      render: (text, record) => (
        <span>
          <Tooltip title="Afficher les détails">
          <a onClick={() => this.props.showDetails(record)}>
            Voir les détails <Icon type="right" />
          </a>
        </Tooltip>
        </span>
      )
    }
  ];

  render(){
    return(
      <Table
          columns={this.columns}
          rowKey={record => record.email}
          dataSource={this.props.dataSource}
          pagination={{total:5, size: "small"}}
          loading={this.props.listState.fetching}
        />
    )
  }

}
export default ClientsTable;