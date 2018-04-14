import React, { Component } from "react";
import { Modal, Button, Icon, Row, Col } from "antd";

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
            <div>
            <Row  type="flex" justify="center">
              <Col span={9}>
                <RoundedImage uri={record.picture} height="170px" />
              </Col>
            </Row>
            <Row  type="flex" justify="center">
              <Col span={6}>
                <h2>
                  {record.firstname} {record.lastname}
                </h2>
              </Col>
              </Row>
              <h4>E-mail: {record.email}</h4>
              <h4>Tel: {record.phone}</h4>
              <h4>Adresse: {record.address}</h4>
              <h4>Fonction: {record.function}</h4>
            </div>
          )}
        </Modal>
      </div>
    );
  }

}

export default ApplicantDetailsModal;
