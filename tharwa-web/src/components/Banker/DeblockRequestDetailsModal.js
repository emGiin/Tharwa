import React, { Component }  from 'react';
import { Icon, Row, Col, Divider, Button, Card, Modal } from 'antd';
import Lightbox from 'react-image-lightbox';

import MotifBlockModal from "./MotifBlockModal"

import "./Styles/style.css";

const { Meta } = Card;
const confirm = Modal.confirm;
class DeblockRequestDetailsModal extends Component{
  state = {
    previewImage: false,
    isModalMotifVisible: false
  };

  showImage(){
    this.setState({ previewImage: true })
  }
  handleConfirmReject(){
      const onReject = this.props.onReject;
      const id= this.props.record.account;
        confirm({
          title: `Voulez-vous vraiment refuser cette demande?`,
          okText: "Oui",
          okType: "danger",
          cancelText: "Annuler",
          onOk() {
            onReject(id);
          }
        });
      }
  handleValidate(){
    this.setState({isModalMotifVisible: true})
  }

  handleCancelModal(){
    this.setState({isModalMotifVisible: false})
  }

  handleOkModal(id, motif, typeAction){
    this.setState({isModalMotifVisible: false})
    this.props.onDeblock(this.props.record.account,motif)
  }
  render(){
    return(
      <div>
      {this.state.isModalMotifVisible && (
         <MotifBlockModal
            action={false}
            account={this.props.record.account} 
            visible={this.state.isModalMotifVisible} 
            cancel={this.handleCancelModal.bind(this)} 
            ok={this.handleOkModal.bind(this)}/>
      )} 
      <Modal
        style={{ top: 10 }}
        width={"60%"}
        title={`Déblocage du compte: ${this.props.record.account}`}
        onCancel={this.props.onCancel}
        visible={this.props.isModalVisible}
        footer={[
           <Button
           type="danger"
           key="reject"
           size="large"
           onClick={() => this.handleConfirmReject()}>
           <Icon type="close" /> Rejeter
         </Button>,
         <Button
           type="primary"
           key="validate"
           size="large"
           onClick={() => this.handleValidate()}>
           <Icon type="check" /> Valider
         </Button>
        ]}
        >
      <div className="ClientDeails">
        {this.state.previewImage && (
            <Lightbox
              mainSrc={this.props.record.justification}
              onCloseRequest={() => this.setState({ previewImage: false })}
            />
          )}      
          <Row type="flex" justify="center" align="middle" gutter={24}>
            <Col xs={24} sm={18} md={12} lg={10} xl={8} >
              <Row type="flex" justify="center" align="middle" gutter={24}>
              <Col span={18}>
              <Card
                cover={<img alt="example" src={this.props.record.client.picture} />}
              >
                <Meta
                  title={`${this.props.record.client.firstname} ${this.props.record.client.lastname}`}
                />
              </Card>
              </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={12} lg={14} xl={16}>
              <Icon type="mail" style={{ marginRight: '20px', fontSize: 18 }} />
              {' ' + this.props.record.client.email}
              <Divider/>
              <Icon type="phone" style={{ marginRight: '20px', fontSize: 18 }} />
              {' ' + this.props.record.client.phone}
              <Divider/>
              <Icon type="home" style={{ marginRight: '20px', fontSize: 18 }} />
              {' ' + this.props.record.client.address}
              <Divider/>
              <Icon type="idcard" style={{ marginRight: '20px', fontSize: 18 }} />
              {' ' + this.props.record.client.function}
              <Divider/>
              <Icon type="tag-o" style={{ marginRight: '20px', fontSize: 18 }} />
              {' ' + this.props.record.client.type_id}
            </Col>
          </Row>
      <Divider/>
      <Row type="flex" align="middle" gutter={24}>
        <Col xs={24} sm={18} md={18} lg={18} xl={18} >
          <p>Type: {{
                COUR: " Courant",
                EPARN: " Epargne",
                DVEUR: " Devise Euro",
                DVUSD: " Devise Dollar"
              }[this.props.record.type_id]}</p>
          <p>Numéro du compte: {this.props.record.account}</p>
          <p>Crée le: {this.props.record.created_at}</p>
        </Col>
        <Col>
          <Row type="flex" justify="center">
                <Col span={2}>
                  <p>Justificatif</p>
                  <Button
                    size="large"
                    shape="circle"
                    icon="file-jpg"
                    onClick={this.showImage.bind(this)}
                  />
                </Col>
          </Row>
        </Col>
      </Row>
      </div>
      </Modal>
      </div>
      )}

}
 

export default DeblockRequestDetailsModal;
