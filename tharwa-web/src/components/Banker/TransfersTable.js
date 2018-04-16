import React, { Component } from "react";
import { Table, Icon, Modal, message, Tooltip } from "antd";

import TransferDetailsModal from "./TransferDetailsModal";

const confirm = Modal.confirm;

class TransfersTable extends Component {
  INITIAL_STATE = {
    selectedTrans:{},
    isModalVisible: false
  };

  state=this.INITIAL_STATE;

  columns = [
   /* {
      title: "Identifiant",
      dataIndex: "id",
      key: "id",
      
    },*/
    {
      title: "Emetteur",
      dataIndex: "emetteur",
      key: "emetteur",
      render: text=> (
        <span>
          <span>
            {text.nom} {text.prenom}
          </span>
          <br/>
          <span>
            {text.compte}
          </span>
      </span>
      )
    },
    {
      title: "Destinataire",
      dataIndex: "destinataire",
      key: "destinataire",
      render: text=> (
        <span>
          <span>
            {text.nom} {text.prenom}
          </span>
          <br/>
          <span>
            {text.compte}
          </span>
      </span>
      )
    },
    {
      title: "Montant DZD",
      dataIndex: "montant",
      key: "montant"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      //sorter: true //TODO : Définir la fonction de sort sur les dates
    },
    {
      title: "",
      key: "action",
      render: record => (
        <span>
          <Tooltip title="Afficher les détails">
            <a href="#" onClick={() => this.handleClickDetails(record)}>
              <Icon type="info-circle" />
            </a>
          </Tooltip>
          <span className="ant-divider" />
          <Tooltip title="Rejeter le virement">
            <a href="#" onClick={() => this.handleConfirmReject(record)}>
              <Icon type="close-circle-o" />
            </a>
          </Tooltip>
          <span className="ant-divider" />
          <Tooltip title="Accepter le virement">
            <a href="#" onClick={() => this.handleValidate(record)}>
              <Icon type="check-circle" />
            </a>
          </Tooltip>
        </span>
      )
    }
  ];

  handleClickDetails(record) {
    this.showDetailsModal(record)
  }

  handleConfirmReject(record) {
    const rejectDemand=this.props.rejectDemand;
    const closeModal=this.closeModal.bind(this);
    confirm({
      title: "Voulez-vous vraiment refuser ce virement?",
      content: "",
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",
      onOk() {
         rejectDemand(record.id);
         closeModal();
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  closeModal(){
    this.setState({
      isModalVisible:false
    })
  }
  handleValidate(record) {
    this.props.acceptDemand(record.id);
    this.closeModal();
  }

  showDetailsModal(record){
    console.log(record);
    this.setState({
      selectedTrans:record,
      isModalVisible:true
    })
  } 

  render() {
    message.destroy();
    if (this.props.actionState.actionFetching) {
      message.loading("En cours d'exécution...", 0);
    } else {
      if (this.props.actionState.actionSuccess) {
        message.success("Action réussie!");
      } else if (this.props.actionState.actionError) {
        message.error(this.props.actionState.actionError);
      }
      setTimeout(this.props.setDefault, 1000);
    } 
    return (
      <div>
        <TransferDetailsModal handleValidate={this.handleValidate.bind(this)} handleConfirmReject={this.handleConfirmReject.bind(this)} actionState={this.props.actionState} transfer={this.state.selectedTrans} visible={this.state.isModalVisible}
         onCancel={()=>{
           this.setState({
             selectedTrans:{},
             isModalVisible: false
           })
           }}/>
      <Table
        columns={this.columns}
        rowKey={record => record.registered}
        dataSource={this.props.list}
        pagination={false}//{this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
/*onRow={(record)=>{
          
          return{
            onClick:()=>{
             this.showDetailsModal(record)
            }
          }
        }}*/
      />
      </div>
    );
  }
}

export default TransfersTable;
