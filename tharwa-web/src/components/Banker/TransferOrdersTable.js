import React, { Component } from 'react';
import { RoundedImage } from '../Reusable Components';
import { Table, Icon, Tooltip } from 'antd';

class TransferOrdersTable extends Component{
 
  render(){
    const columns = [
      {
        title: '',
        dataIndex: 'source_id',
        key: 'source_id',
        render: text => (
          <span>
            <RoundedImage uri={text.picture} height="50px" />
          </span>
        )
      },
      {
        title: 'Nom',
        dataIndex: 'source_id',
        key: 'nom',
        render:text=>(
          <span>
            {text.lastname}
          </span>
        )
      },
      {
        title: 'Prénom',
        dataIndex: 'source_id',
        key: 'prenom',
        render:text=>(
          <span>
            {text.firstname}
          </span>
        )
      },
      {
        title: 'E-mail',
        dataIndex:'source_id',
        key:'email',
        render:text=>(
          <span>
            {text.email}
          </span>
        )
      },
      {
        title: 'Numéro de compte',
        dataIndex: 'source_id',
        key: 'compte',
        render:text=>(
          <span>
            {text.account}
          </span>
        )
      },
      {
        title: 'Date',
        dataIndex: 'creationdate',
        key: 'creationdate'
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
          rowKey={record => record.source_id.email}
          dataSource={this.props.dataSource}
          pagination={{ pageSize: 5, size: 'small' , hideOnSinglePage: true}}
          loading={this.props.listState.fetching}
        />
    )
  }

}
export default TransferOrdersTable;