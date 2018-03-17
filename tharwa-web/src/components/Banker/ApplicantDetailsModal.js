import React, { Component } from "react";
import { Modal, Button, Icon } from "antd";

import RoundedImage from "../Reusable Components/RoundedImage";
import LoadingSpinner from "../Reusable Components/LoadingSpinner";

const confirm = Modal.confirm;

class ApplicantDetailsModal extends Component {
  render() {
    const { visible, loading } = this.props;
    const record = this.props.user;
    return (
      <div>
        <Modal
          visible={visible}
          title="Détails"
          onCancel={this.handleCancel}
          footer={[
            <Button
              type="primary"
              key="validate"
              size="large"
              disabled={loading}
              onClick={this.handleValidate}
            >
              <Icon type="user-add" /> Valider
            </Button>,
            <Button
              type="danger"
              key="reject"
              size="large"
              disabled={loading}
              onClick={this.handleConfirmReject}
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


  handleCancel = () => {
    // TODO : set visibility to false
  };

  handleValidate() {
    console.log("Valider");
    //TODO : Send validation request

    // //if success
    // Modal.success({
    //   title: "Demande d'inscription validée",
    //   content: ""
    // });
  }

  handleConfirmReject(nom, prenom) {
    confirm({
      title: "Voulez-vous vraiment rejeter cette demande?",
      content: "Nom: " + nom + " " + prenom,
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",
      onOk() {
        //TODO : Send Rejection request 
      },
      onCancel() {
        //TODO : set visibility to false         
      }
    });
  }
}

export default ApplicantDetailsModal;
