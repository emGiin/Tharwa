import React from 'react';
import { Icon, Row, Col, Divider } from 'antd';

import { RoundedImage, ModalWithActions } from '../Reusable Components/';

const Body = ({ record }) => (
  <div>
    <Row type="flex" justify="center">
      <Col span={12}>
        <RoundedImage uri={record.client.picture} height="170px" />
      </Col>
    </Row>
    <br />
    <Icon type="mail" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.client.email}
    <Divider />
    <Icon type="phone" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.client.phone}
    <Divider />
    <Icon type="home" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.client.address}
    <Divider />
    <Icon type="idcard" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.client.function}
    <Divider />
    <Icon type="tag-o" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.client.type}
    <Divider />
    <Icon type="plus-square" style={{ marginRight: '20px', fontSize: 18 }} />
    {{
          EPARN: " Epargne",
          DVEUR: " Devise Euro",
          DVUSD: " Devise Dollar"
        }[record.type_id]}
  </div>
);

export default props => (
  <ModalWithActions
    body={Body}
    width={400}
    title={`${props.record.client.firstname} ${props.record.client.lastname}`}
    {...props}
  />
);
