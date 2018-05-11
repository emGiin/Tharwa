import React, { Component } from 'react';
import { Table, Button, Modal,Icon, Divider,Col,Row, Card,Tooltip, message } from 'antd';

import "./Styles/style.css";
const { Meta } = Card;
class ClientsTable extends Component{
  columns = [
    {
      title: 'Type de compte',
      dataIndex: 'type',
      key: 'type',
      render: text => (
        <span>
          {{
            COURT: "Courant",
            EPARN: "Epargne",
            DVEUR: "Devise Euro",
            DVUSD: "Devise Dollar"
          }[text]}
        </span>
      )
    },
    {
      title: 'Numéro de compte',
      dataIndex: 'num',
      key: 'num'
    },
    {
      title: 'Date de création',
      dataIndex: 'created_at',
      key: 'created_at'
    },
    {
      title: 'Etat',
      dataIndex: 'status',
      key: 'status',
      render: text => (
        <span>
         {{
          working: "Fonctionnel",
          blocked: "Bloqué",
        }[text]}
        </span>
      )
    },
    {
      title:'',
      key:'action',
      render: (text, record) => (
        <span>
          <Button type={{working: "danger",
          blocked: "primary",
        }[record.status]} onClick={() => this.props.action(record)}> {{
          working: " Bloquer ",
          blocked: "Débloquer",
        }[record.status]}</Button>
        </span>
      )
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
        message.success('Action réussie!', this.props.setDefaultD);
      } else if (this.props.accountActionState.error) {
        message.error(this.props.accountActionState.error, this.props.setDefaultD);
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
              cover={<img alt="example" src={this.props.record.picture} />}
            >
              <Meta
                title={`${this.props.record.firstname} ${this.props.record.lastname}`}
              />
            </Card>
            </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={14} xl={16}>
          <Divider/>
            <Icon type="mail" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.props.record.email}
            <Divider/>
            <Icon type="phone" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.props.record.phone}
            <Divider/>
            <Icon type="home" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.props.record.address}
            <Divider/>
            <Icon type="idcard" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.props.record.function}
            <Divider/>
            <Icon type="tag-o" style={{ marginRight: '20px', fontSize: 18 }} />
            {' ' + this.props.record.type}
            <Divider/>
          </Col>
        </Row>
    <br />
        <Table
            columns={this.columns}
            rowKey={record => record.num}
            dataSource={this.props.record.accounts}
            pagination={false}
            borderd
            loading={this.props.fetching}
          />
      </div>
    )
  }

}
export default ClientsTable;