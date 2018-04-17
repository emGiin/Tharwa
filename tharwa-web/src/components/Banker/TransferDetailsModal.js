import React, { Component } from "react";
import { Modal, Button, Icon, Row, Col, Card, Divider } from "antd";
import Lightbox from 'react-image-lightbox';

import LoadingSpinner from "../Reusable Components/LoadingSpinner";
import '../Reusable Components/Styles/style.css';


class TransferDetailsModal extends Component {
  state={
    isOpen: false
  }
  render() {
    const { visible, loading } = this.props;
    const record = this.props.transfer;
    const emetteur=record.source_id;
    const destinataire=record.destination_id;
    const title= `Virement: ${record.code}`
    return (
      <div>
        <Modal
          style={{ top: 20 }}
          width={650}
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
                <h4>{emetteur?emetteur.firstname:""} {emetteur?emetteur.lastname:""}</h4>
                <h4>Compte: {emetteur?emetteur.account:""}</h4>
                <h4>Banque: {emetteur?emetteur.bank:""}</h4>
                </Card>
              </Col>
              <Col xs={0} md={2}> <Button shape="circle" icon="double-right" disabled/></Col>
              <Col xs={23} md={10} >
              <Card title="Destinataire" bordered={false}>
              <h4>{destinataire?destinataire.firstname:""} {destinataire?destinataire.lastname:""}</h4>
                <h4>Compte: {destinataire?destinataire.account:""}</h4>
                <h4>Banque: {destinataire?destinataire.bank:""}</h4>
                </Card>
              </Col>
              <Col span={24}>
              <Divider orientation="left" >Montant</Divider>
                <h4>{record.amount} DZD</h4>
                <Divider orientation="left" >Motif</Divider>
                <p>{record.reason}</p>
                <Divider orientation="left">Justificatif</Divider>
                <Row type="flex" justify="center">
                <Col span={2}>
                <Button  size="large" shape="circle" icon="file-jpg" onClick={()=> this.setState({ isOpen: true })}/>
                {/*
                <div href="#" className={"justif"}>
                <img style={{width:"100%", height:"100%"}} src={record.justification} alt="justificatif"/>
                <div class="overlay"></div>
                <Button ghost className={"buttonJustif"} size="large" shape="circle" icon="arrows-alt" onClick={()=> this.setState({ isOpen: true })}/>
                </div>*/}
                {this.state.isOpen && (
                  <Lightbox
                    mainSrc={record.justification}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                  />
                )}
                </Col>
              </Row>
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
