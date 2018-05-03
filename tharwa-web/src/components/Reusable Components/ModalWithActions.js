import React from 'react';
import { Button, Icon, Modal } from 'antd';

import LoadingSpinner from './LoadingSpinner';

export const Footer = ({ record, handleValidate, handleConfirmReject, loading }) => [
  <Button
    type="danger"
    key="reject"
    size="large"
    loading={loading}
    onClick={() => handleConfirmReject(record)}>
    <Icon type="close" /> Rejeter
  </Button>,
  <Button
    type="primary"
    key="validate"
    size="large"
    loading={loading}
    onClick={() => handleValidate(record)}>
    <Icon type="check" /> Valider
  </Button>
];

export default ({ body:Body, record, ...props }) => {
  return (
    <Modal
      style={{ top: 20 }}
      width={props.width}
      visible={props.visible}
      title={props.title}
      onCancel={props.onCancel}
      footer={Footer({ record, ...props })}>
      {props.loading ? <LoadingSpinner /> : <Body record={record} {...props} />}
    </Modal>
  );
};
