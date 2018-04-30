import React, { Component } from 'react';
import { Button, Row, Col, Card, Divider } from 'antd';
import Lightbox from 'react-image-lightbox';

import { ModalWithActions } from '../Reusable Components/';
// import '../Reusable Components/Styles/style.css';

const Body = ({
  record: { source_id: source, destination_id: destination, ...record },
  showImage
}) => (
  <div className="modalBody">
    <Row type="flex" justify="center">
      <Col xs={23} md={10}>
        <Card title="Emetteur" bordered={false}>
          <h4>{source.firstname + ' ' + source.lastname}</h4>
          <h4>Compte: {source.account}</h4>
          <h4>Banque: {source.bank}</h4>
        </Card>
      </Col>
      <Col xs={0} md={2}>
        {' '}
        <Button shape="circle" icon="double-right" disabled />
      </Col>
      <Col xs={23} md={10}>
        <Card title="Destinataire" bordered={false}>
          <h4>{destination.firstname + ' ' + destination.lastname}</h4>
          <h4>Compte: {destination.account}</h4>
          <h4>Banque: {destination.bank}</h4>
        </Card>
      </Col>
      <Col span={24}>
        <Divider orientation="left">Montant</Divider>
        <h4>{record.amount} DZD</h4>
        <Divider orientation="left">Motif</Divider>
        <p>{record.reason}</p>
        <Divider orientation="left">Justificatif</Divider>
        <Row type="flex" justify="center">
          <Col span={2}>
            <Button
              size="large"
              shape="circle"
              icon="file-jpg"
              onClick={showImage}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default class TransferDetailsModal extends Component {
  state = {
    previewImage: false
  };

  render() {
    return (
      <div>
        {this.state.previewImage && (
          <Lightbox
            mainSrc={this.props.record.justification}
            onCloseRequest={() => this.setState({ previewImage: false })}
          />
        )}
        <ModalWithActions
          body={Body}
          width={650}
          title={`Virement: ${this.props.record.code}`}
          showImage={() => this.setState({ previewImage: true })}
          {...this.props}
        />
      </div>
    );
  }
}
