import React, { Component } from "react";
import { Table, Icon, Modal, message } from "antd";

import RoundedImage from "../Reusable Components/RoundedImage";
import ApplicantDetailsModal from "./ApplicantDetailsModal";
import { LoadingSpinner } from "../Reusable Components";
import { acceptDemand } from "../../sagas/ConfirmInscriptionSaga";

const confirm = Modal.confirm;

class RequestsTable extends Component {
  state = {
    pagination: {},
    loading: false,
    data: [],
    selectedUser:{},
    isModalVisible: false
  };

  columns = [
    {
      title: "",
      dataIndex: "photo",
      key: "photo",
      render: text => (
        <span>
          <RoundedImage uri={text} height="70%" />
        </span>
      )
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom"
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom"
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: true //TODO : Définir la fonction de sort sur les dates
    },
    {
      title: "",
      key: "action",
      render: record => (
        <span>
          <a href="#" onClick={() => this.handleClickDetails(record)}>
            <Icon type="info-circle" />
          </a>
          <span className="ant-divider" />
          <a href="#" onClick={() => this.handleConfirmReject(record)}>
            <Icon type="minus-circle-o" />
          </a>
          <span className="ant-divider" />
          <a href="#" onClick={() => this.handleValidate(record)}>
            <Icon type="check-circle" />
          </a>
        </span>
      )
    }
  ];

  handleClickDetails(record) {
    this.showDetailsModal(record)
  }

  handleConfirmReject(record) {
    const { nom, prenom } = record;
    const rejectDemand=this.props.rejectDemand;
    
    confirm({
      title: "Voulez-vous vraiment rejeter cette demande?",
      content: `Nom: ${nom} ${prenom}`,
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",
      onOk() {
         rejectDemand(record.email);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  handleValidate(record) {
    this.props.acceptDemand(record.email);
  }

  showDetailsModal(record){
    this.setState({
      selectedUser:record,
      isModalVisible:true
    })
  } 

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };
  fetch = (params = {}) => {
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    //API------
    //getting records by pages of 20 for example
    pagination.total = 1; //totalcount of records=data.totalcount
    this.setState({
      loading: false,
      data: this.props.list,
      pagination
    });
  };
  componentDidMount() {
    // FETCHING HAPPENS INSIDE REDUX SAGAS AND API SERVICES
    this.fetch();
  }
  render() {
    const setDefault=this.props.setDefault;
    this.props.actionState.actionSuccess &&
      message.success( "Action réussie!") && 
      setTimeout(() => {
        console.log("tmeout");
        setDefault()
      }, 1000);
    this.props.actionState.actionError &&
      message.error( this.props.actionState.actionError)
    this.props.actionState.actionFetching &&
      message.loading("En cours d'exécution...")
    return (
      <div>

        <ApplicantDetailsModal handleValidate={this.handleValidate.bind(this)} handleConfirmReject={this.handleConfirmReject.bind(this)} actionState={this.props.actionState} user={this.state.selectedUser} visible={this.state.isModalVisible}
         onCancel={()=>{
           this.setState({
             selectedUser:{},
             isModalVisible: false
           })
           }}/>
      <Table
        columns={this.columns}
        rowKey={record => record.registered}
        dataSource={this.props.list}
        pagination={this.state.pagination}
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

export default RequestsTable;
