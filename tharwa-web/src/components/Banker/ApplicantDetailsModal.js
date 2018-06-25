import React from 'react';
import { Icon, Row, Col, Divider } from 'antd';

import { RoundedImage, ModalWithActions } from '../Reusable Components/';

export const Body = ({ record }) => (
  <div>
    <Row type="flex" justify="center">
      <Col span={12}>
        <RoundedImage uri={record.picture} height="170px" />
      </Col>
    </Row>
    <br />
    <Icon type="mail" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.email}
    <Divider />
    <Icon type="phone" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.phone}
    <Divider />
    <Icon type="home" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.address}
    <Divider />
    <Icon type="idcard" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.function}
    <Divider />
    <Icon type="tag-o" style={{ marginRight: '20px', fontSize: 18 }} />
    {' ' + record.type}
  </div>
);

export default props => (
  <ModalWithActions
    body={Body}
    width={400}
    title={`${props.record.firstname} ${props.record.lastname}`}
    {...props}
  />
);
