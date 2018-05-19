import React, { Component } from 'react';
import { Table, Button,Icon, Divider,Col,Row, Card, message } from 'antd';

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
      key: 'firstname'
    },
    {
      title: 'Banque',
      dataIndex: 'bank',
      key: 'bank'
    },
    {
      title: 'Numéro de compte',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: 'Montant',
      dataIndex: 'amount',
      key: 'amount'
    }
  ];

  notify = () => {
    message.config({  
      duration: 2,
      maxCount: 1,
    })
    message.destroy();
    console.log(this.props.accountActionState);
    
    if (this.props.accountActionState.fetching) {
      message.loading("En cours d'exécution...", 0);
    } else {
      if (this.props.accountActionState.success) {
        message.success('Action réussie!', this.props.setDefault);
      } else if (this.props.accountActionState.error) {
        message.error(this.props.accountActionState.error, this.props.setDefault);
      }
    }
  };

  render(){
    return(
      <div className="ClientDeails">
      {this.notify()}
        <Row type="flex" justify="center" align="middle" gutter={24}>
          <Col span={24}>
            <Button shape="circle" icon="arrow-left" onClick={() => this.props.close()}/>
          </Col>
          <Col xs={24} sm={18} md={12} lg={10} xl={8} >
            <Row type="flex" justify="center" align="middle" gutter={24}>
            <Col span={18}>
            <Card
              cover={<img alt="example" src={this.state.record.picture} />}
            >
              <Meta
                title={`${this.state.record.firstname} ${this.state.record.lastname}`}
              />
            </Card>
            </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={14} xl={16}>
          <Divider/>
            <Icon type="mail" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.state.record.email}
            <Divider/>
            <Icon type="phone" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.state.record.phone}
            <Divider/>
            <Icon type="home" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.state.record.address}
            <Divider/>
            <Icon type="idcard" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.state.record.function}
            <Divider/>
            <Icon type="tag-o" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.state.record.type_id}
            <Divider/>
          </Col>
          <Col>
            <h3>Motif</h3>
            <span>
              {this.state.record.reason}
            </span>
          </Col>
        </Row>
    <br />
        <Table
            columns={this.columns}
            rowKey={record => record.number}
            dataSource={this.state.record.destination_ids}
            pagination={false}
            borderd
          />
      </div>
    )
  }

}
export default TransferOrderDetails;