import React,{Component} from 'react';
import {Table, Tooltip, message, Icon} from 'antd'
import DeblockRequestDetailsModal from './DeblockRequestDetailsModal';
import {RoundedImage } from '../Reusable Components';

class DeblockRequestsTable extends Component{
  state = {
    selectedRecord: {client:{}},
    isModalVisible: false
  };
  
  showDetails(record){
    this.setState({selectedRecord:record,isModalVisible: true});
  }
  columns = [
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
      key: 'lastname',
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
      title: 'Type du compte',
      dataIndex: 'type_id',
      key: 'type_id',
      render: text => (
        <span>
          {{
            EPARN: "Epargne",
            DVEUR: "Devise Euro",
            DVUSD: "Devise Dollar",
            COUR: "Courant"
          }[text]}
        </span>
      )
    },
    {
      title: 'Numéro du compte',
      dataIndex: 'account',
      key: 'account'
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at'
    },{
      title:'',
      key:'action',
      render: (text, record) => (
        <span>
          <Tooltip title="Détails">
          <a onClick={()=> this.showDetails(record)}>
            Voir les détails <Icon type="right" />
          </a>
        </Tooltip>
        </span>
      )
    }
  ];
  onReject(account){
    this.setState({selectedRecord:{},isModalVisible:false})
    this.props.rejectRequest(account);
  }
  onDeblock(account, motif){
    this.setState({selectedRecord:{},isModalVisible:false})
    this.props.acceptRequest(account, motif);
  }

  onCancel(){
    this.setState({selectedRecord:{},isModalVisible:false})
  }

  notify = () => {
    message.config({
      duration: 2,
      maxCount: 1
    });
    message.destroy();
    if (this.props.actionState.fetching) {
      message.loading("En cours d'exécution...", 0);
    } else {
      if (this.props.actionState.success) {
        message.success('Action réussie!', this.props.setDefault);
      } else if (this.props.actionState.error) {
        message.error(this.props.actionState.error, this.props.setDefault);
      }
    }
  };

  render(){
    return(
      <div>
        {this.notify()}
        {this.state.isModalVisible && 
        <DeblockRequestDetailsModal
         isModalVisible={this.state.isModalVisible}
          record={this.state.selectedRecord}
          onReject={this.onReject.bind(this)}
          onDeblock={this.onDeblock.bind(this)}
          onCancel={this.onCancel.bind(this)}
        />}
      <Table
      columns={this.columns}
      rowKey={record => record.account}
      dataSource={this.props.list}
      pagination={{pageSize:5, size: "small"}}
      loading={this.props.listState.fetching}
    />
    </div>
    )
  }

}

export default DeblockRequestsTable;