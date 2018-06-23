import React, { Component } from 'react';
import { Table, Button,Icon, Divider,Col,Row, Card, message } from 'antd';

import "./Styles/style.css";
const { Meta } = Card;
class ClientDetails extends Component{
  constructor(props){
    super(props);
    let r;
    console.log("Props:",props)
    for (let element of props.list) {
      if(element.email===props.id){
        r=element;
        break;
      } 
    }
    this.state={record:r};
}
componentWillReceiveProps(nextProps) {
  let r;
  console.log("nextProps:",nextProps)
  for (let element of nextProps.list) {
    if(element.email===nextProps.id){
      r=element;
      break;
    } 
  }
    this.setState({ record: r });
    console.log(this.state.record);
}
  columns = [
    {
      title: 'Type de compte',
      dataIndex: 'type_id',
      key: 'type_id',
      render: text => (
        <span>
          {{
            "COUR ": "Courant",
            EPARN: "Epargne",
            DVEUR: "Devise Euro",
            DVUSD: "Devise Dollar"
          }[text]}
        </span>
      )
    },
    {
      title: 'Numéro de compte',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: 'Date de création',
      dataIndex: 'created_at',
      key: 'created_at'
    },
    {
      title: 'Etat',
      dataIndex: 'isvalid',
      key: 'isvalid',
      render: valid => (
        <span>
        {{
          1:"Fonctionnel",
          0:"Bloqué"
        }[valid]}
        </span>
      )
    },
    {
      title:'',
      key:'action',
      render: (text, record) => (
        <span>
          <Button 
            style={{minWidth:"95px"}}
            type={record.isvalid==1 ? ("danger") : ("primary")}
            onClick={() => this.props.action(record)}> {{
              1:"Bloquer",
              0:"Débloquer"
            }[record.isvalid]}
          </Button>
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
        </Row>
    <br />
        <Table
            columns={this.columns}
            rowKey={record => record.number}
            dataSource={this.state.record.accounts}
            pagination={false}
            borderd
          />
      </div>
    )
  }

}
export default ClientDetails;