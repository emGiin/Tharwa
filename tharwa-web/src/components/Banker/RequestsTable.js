import React, { Component } from "react";
import { Table, Icon, Modal, message, Tooltip } from "antd";

import RoundedImage from "../Reusable Components/RoundedImage";
import ApplicantDetailsModal from "./ApplicantDetailsModal";

const confirm = Modal.confirm;

class RequestsTable extends Component {
  INITIAL_STATE = {
    selectedUser: {},
    isModalVisible: false
  };

  state = this.INITIAL_STATE;

  showModal(record) {
    this.setState({
      selectedUser: record,
      isModalVisible: true
    });
  }

  closeModal() {
    this.setState(this.INITIAL_STATE);
  }

  handleValidate(record) {
    this.props.acceptDemand(record.email);
    this.closeModal();
  }

  handleConfirmReject(record) {
    const closeModal = this.closeModal.bind(this);
    confirm({
      title: "Voulez-vous vraiment rejeter cette demande?",
      content: `Nom: ${record.firstname} ${record.lastname}`,
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",
      onOk() {
        this.props.rejectDemand(record.email);
        closeModal();
      }
    });
  }

  render() {
    let content = null;
    const setDefault = this.props.setDefault;
    if (this.props.actionState.actionFetching) {
      message.destroy();
      content = message.loading("En cours d'exécution...", 0);
    } else {
      if (this.props.actionState.actionSuccess) {
        content = message.success("Action réussie!");
        setTimeout(() => {
          console.log("tmeout");
          setDefault();
        }, 1000);
      } else {
        if (this.props.actionState.actionError) {
          message.error(this.props.actionState.actionError);
          setTimeout(() => {
            console.log("tmeout");
            setDefault();
          }, 1000);
        }
      }
    }
    return (
      <div>
        <div>{content}</div>
        <ApplicantDetailsModal
          handleValidate={this.handleValidate.bind(this)}
          handleConfirmReject={this.handleConfirmReject.bind(this)}
          actionState={this.props.actionState}
          user={this.state.selectedUser}
          visible={this.state.isModalVisible}
          onCancel={() => this.setState(this.INITIAL_STATE)}
        />
        <Table
          columns={this.columns}
          rowKey={record => record.email}
          dataSource={this.props.list}
          pagination={false}
          loading={this.props.fetching}
        />
      </div>
    );
  }

  columns = [
    {
      title: "",
      dataIndex: "picture",
      key: "picture",
      render: text => (
        <span>
          <RoundedImage uri={text} height="50px" />
        </span>
      )
    },
    {
      title: "Nom",
      dataIndex: "lastname",
      key: "lastname"
    },
    {
      title: "Prénom",
      dataIndex: "firstname",
      key: "firstename"
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at"
      // sorter: true //TODO : Définir la fonction de sort sur les dates
    },
    {
      title: "",
      key: "action",
      render: record => (
        <span>
          <Tooltip title="Afficher les détails">
            <a onClick={() => this.showModal(record)}>
              <Icon type="info-circle" />
            </a>
          </Tooltip>
          <span className="ant-divider" />
          <Tooltip title="Rejeter la demande">
            <a onClick={() => this.handleConfirmReject(record)}>
              <Icon type="close-circle-o" />
            </a>
          </Tooltip>
          <span className="ant-divider" />
          <Tooltip title="Accepter la demande">
            <a onClick={() => this.handleValidate(record)}>
              <Icon type="check-circle" />
            </a>
          </Tooltip>
        </span>
      )
    }
  ];
}

export default RequestsTable;
