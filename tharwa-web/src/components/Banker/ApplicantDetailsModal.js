import React, { Component } from "react";
import { Modal, Button, Icon, Row, Col,Divider } from "antd";

import RoundedImage from "../Reusable Components/RoundedImage";
import LoadingSpinner from "../Reusable Components/LoadingSpinner";


class ApplicantDetailsModal extends Component {
  render() {
    const { visible, loading } = this.props;
    const record = this.props.user;
    return (
      <div>
        <Modal
          style={{top:20}}
          width={400}
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
              <Col span={12}>
                <RoundedImage uri={record.picture} height="170px" />
              </Col>
            </Row>
            <Row  type="flex" justify="center">
              <Col span={7}>
                <h2>
                  {record.firstname} {record.lastname}
                </h2>
              </Col>
              </Row>
              <span><Icon type="mail" style={{marginRight:"20px",fontSize:18}}/> {record.email}</span>
              <Divider/>
              <span><Icon type="phone" style={{marginRight:"20px",fontSize:18}}/> {record.phone}</span>
              <Divider/>
              <span><Icon type="home" style={{marginRight:"20px",fontSize:18}}/> {record.address}</span>
              <Divider/>
              <span><Icon type="idcard" style={{marginRight:"20px",fontSize:18}}/> {record.function}</span>
            </div>
          )}
        </Modal>
      </div>
    );
  }

}

export default ApplicantDetailsModal;
