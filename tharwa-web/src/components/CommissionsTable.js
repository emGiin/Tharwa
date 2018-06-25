import React, { Component } from "react";
import { Table, Icon, Modal, message, Tooltip } from "antd";

import RoundedImage from "./Reusable Components/RoundedImage";
import ApplicantDetailsModal from "./Banker/ApplicantDetailsModal";

const confirm = Modal.confirm;

class CommissionsTable extends Component {
  INITIAL_STATE = {
    CommissionsList: {},
    isModalVisible: false
  };

  state = this.INITIAL_STATE;

  showModal(record) {
    this.setState({
      CommissionsList: record,
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
    const rejectDemand = this.props.rejectDemand;
  
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

        <Table
          columns={this.columns}
          rowKey={record => record.email}
          dataSource={this.props.list}
          pagination={true}
          loading={this.props.fetching}
        />
      </div>
    );
  }

  columns = [
    // {
    //   title: "",
    //   dataIndex: "picture",
    //   key: "picture",
    //   render: text => (
    //     <span>
    //       <RoundedImage uri={text} height="50px" />
    //     </span>
    //   )
    // },
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
      title: "Type Commission",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Montant",
      dataIndex: "montant",
      key: "montant"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    }
  ];
}


export default CommissionsTable;