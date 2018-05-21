import React, { Component } from 'react';
import { Table, Button,Icon, Divider,Col,Row, Card, Modal } from 'antd';

import "./Styles/style.css";
const { Meta } = Card;
class TransferOrderDetails extends Component{
  columns = [
     {
        title: 'Nom',
        dataIndex: 'lastname',
        key: 'lastname'
      },
      {
        title: 'Prénom',
        dataIndex: 'firstname',
        key: 'firstname',
      },
    {
      title: 'Banque',
      dataIndex: 'bank',
        key: 'bank'
    },
    {
      title: 'Numéro de compte',
      dataIndex: 'account',
      key: 'account'
    },
    {
      title: 'Montant',
      dataIndex: 'amount',
      key: 'amount',
      render: amount=>(
        <span>
         {amount}{" DZD"}
        </span>
      )
    }
  ];

  

  handleConfirmReject() {
    const rejectOrder = this.props.rejectOrder;
    const id=this.props.record.code
    Modal.confirm({
      title: 'Voulez-vous vraiment rejeter cet ordre de virement?', //TODO: this is modal dependent
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        rejectOrder(id);
      }
    });
  }

  handleValidate(){
    this.props.acceptOrder(this.props.record.code)
  }

  render(){
    const source=this.props.record.source_id
    return(
      <div className="ClientDeails">
        <Row type="flex" justify="center" align="middle" gutter={24}>
          <Col span={24}>
            <Button shape="circle" icon="arrow-left" onClick={() => this.props.close()}/>
          </Col>
          <Col xs={24} sm={18} md={12} lg={10} xl={8} >
            <Row type="flex" justify="center" align="middle" gutter={24}>
            <Col span={18}>
            <Card
              cover={<img alt="example" src={source.picture} />}
            >
              <Meta
                title={`${source.firstname} ${source.lastname}`}
              />
            </Card>
            </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={14} xl={16}>
          <Divider/>
            <Icon type="mail" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + source.email}
            <Divider/>
            <Icon type="phone" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + source.phone}
            <Divider/>
            <Icon type="home" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + source.address}
            <Divider/>
            <Icon type="idcard" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + source.function}
            <Divider/>
          </Col>
          </Row>
          <br />
          <h3>Motif</h3>
          <span>
            {this.props.record.reason}
          </span>
    <br />
    <br />
        <Table
            columns={this.columns}
            rowKey={record => record.account}
            dataSource={this.props.record.destination_ids}
            pagination={false}
            borderd
            footer={() =>
            <div>
                <Button
                  style={{marginRight:"10px"}}
                  type="danger"
                  key="reject"
                  size="large"
                  onClick={() => this.handleConfirmReject()}>
                  <Icon type="close" /> Rejeter
                </Button>
                <Button
                  type="primary"
                  key="validate"
                  size="large"
                  onClick={() => this.handleValidate()}>
                  <Icon type="check" /> Valider
                </Button>
            </div>
            }
          />
      </div>
    )
  }

}
export default TransferOrderDetails;