import React, { Component } from "react";
import { Modal, Button, Icon } from "antd";

import RoundedImage from "../Reusable Components/RoundedImage";
import LoadingSpinner from "../Reusable Components/LoadingSpinner";


class ApplicantDetailsModal extends Component {
  render() {
    const { visible, loading } = this.props;
    const record = this.props.user;
    return (
      <div>
        <Modal
          visible={visible}
          title="Détails"
          onCancel={this.props.onCancel}
          footer={[
            <Button
              type="primary"
              key="validate"
              size="large"
              disabled={loading}
              onClick={()=>this.props.handleValidate(record)}
            >
              <Icon type="user-add" /> Valider
            </Button>,
            <Button
              type="danger"
              key="reject"
              size="large"
              disabled={loading}
              onClick={()=>this.props.handleConfirmReject(record)}
            >
              <Icon type="user-delete" /> Rejeter
            </Button>
          ]}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="modalBody">
              <RoundedImage uri={record.photo} height="170px" />
              <h2>
                {record.nom} {record.prenom}
              </h2>
              <h4>E-mail: {record.email}</h4>
              <h4>Tel: {record.tel}</h4>
              <h4>Adresse: {record.adresse}</h4>
              <h4>Fonction: {record.fonction}</h4>
            </div>
          )}
        </Modal>
      </div>
    );
  }

}

export default ApplicantDetailsModal;
