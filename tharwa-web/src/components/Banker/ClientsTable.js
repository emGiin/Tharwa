import React, { Component } from 'react';
import { RoundedImage } from '../Reusable Components';
import { Table, Icon, Tooltip } from 'antd';

class ClientsTable extends Component{
 
  constructor(props){
    super(props);
    this.state = {
      filteredInfo: null,
      origin: props.dataSource,
      data: props.dataSource
    };
}
componentWillReceiveProps(nextProps) {
   this.setState({ origin: nextProps.dataSource, data: nextProps.dataSource});
}

  handleChange = (pagination, filters, sorter) => {
   
    if(filters.type_id!=null){
      console.log('Various parameters',pagination, filters.type_id.length===0, sorter);
      if(filters.type_id.length===0){
        this.setState({
          filteredInfo: null,
          data: this.state.origin
        });
      }else{
        var d=[];
        for(let e of this.state.origin){
          if(filters.type_id.includes(e.type_id)){
            d.push(e);
          }
        }
        this.setState({
          filteredInfo: filters,
          data: d
        });
      }
    }
  }
  

  render(){
    let {  filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
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
        title: 'Date d\'inscription',
        dataIndex: 'created_at',
        key: 'created_at'
      },
      {
        title: 'Type',
        dataIndex: 'type_id',
        key: 'type_id',
        filters: [
          { text: 'Client', value: 'Client' },
          { text: 'Employeur', value: 'Employeur' },
        ],
        filteredValue: filteredInfo.type_id || null,
        onFilter: (value, record) => record.type_id.includes(value)
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
    return(
      <Table
          onChange={this.handleChange}
          columns={columns}
          rowKey={record => record.email}
          dataSource={this.state.data}
          pagination={{pageSize:5, size: "small"}}
          loading={this.props.listState.fetching}
        />
    )
  }

}
export default ClientsTable;