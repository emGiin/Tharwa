import React, { Component } from "react";
import { Modal, Button, Icon, Row, Col, Card, Divider } from "antd";

import LoadingSpinner from "../Reusable Components/LoadingSpinner";


class TransferDetailsModal extends Component {
  render() {
    const { visible, loading } = this.props;
    const record = this.props.transfer;
    const emetteur=record.emetteur;
    const destinataire=record.destinataire;
    const title= `Virement: ${record.id}`
    return (
      <div>
        <Modal
          style={{ top: 20 }}
          width={750}
          visible={visible}
          title={title}
          onCancel={this.props.onCancel}
          footer={[
            <Button
              type="primary"
              key="validate"
              size="large"
              disabled={loading}
              onClick={()=>this.props.handleValidate(record)}
            >
              <Icon type="check" /> Valider
            </Button>,
            <Button
              type="danger"
              key="reject"
              size="large"
              disabled={loading}
              onClick={()=>this.props.handleConfirmReject(record)}
            >
              <Icon type="close" /> Rejeter
            </Button>
          ]}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="modalBody">
            <Row  type="flex" justify="center">
              <Col xs={23} md={10}>
               <Card title="Emetteur" bordered={false}>
                <h4>{emetteur?emetteur.nom:""} {emetteur?emetteur.prenom:""}</h4>
                <h4>Compte: {emetteur?emetteur.compte:""}</h4>
                <h4>Banque: {emetteur?emetteur.compte:""}</h4>
                </Card>
              </Col>
              <Col xs={0} md={2}> <Button shape="circle" icon="double-right" disabled/></Col>
              <Col xs={23} md={10} >
              <Card title="Destinataire" bordered={false}>
                <h4>{destinataire?destinataire.nom:""} {destinataire?destinataire.prenom:""}</h4>
                <h4>Compte: {destinataire?destinataire.compte:""}</h4>
                <h4>Banque: {destinataire?destinataire.compte:""}</h4>
                </Card>
              </Col>
              <Col span={24}>
              <Divider orientation="left" >Montant</Divider>
                <h4>{record.montant} DZD</h4>
                <Divider orientation="left" >Motif</Divider>
                <p>{record.motif}</p>
                <Divider orientation="left">Justificatif</Divider>
                <img style={{marginTop:"10px"}} src={record.justif} alt="justificatif"/>
              </Col>
            </Row>
            </div>
          )}
        </Modal>
      </div>
    );
  }

}

export default TransferDetailsModal;
