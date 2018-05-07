import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Modal, message, Tooltip } from 'antd';

class TableWithActions extends Component {
  constructor(props) {
    super(props);
    this.INITIAL_STATE = this.props.initialState;
    this.state = this.INITIAL_STATE;

    this.columns = [...this.props.columns, this.actionsColumn];
  }

  componentWillUnmount(){
    this.props.setDefault();
  }

  render() {
    const CustomModal = this.props.modal;
    return (
      <div>
        {this.notify()}
        <CustomModal
          handleValidate={this.handleValidate.bind(this)}
          handleConfirmReject={this.handleConfirmReject.bind(this)}
          onCancel={() => this.setState(this.INITIAL_STATE)}
          loading={this.props.actionState.fetching}
          record={this.state.selectedRecord}
          visible={this.state.isModalVisible}
        />
        <Table
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={this.props.dataSource}
          pagination={false}
          loading={this.props.fetching}
          pagination={{ pageSize: 5 }}
        />
      </div>
    );
  }

  showModal = record =>
    this.setState({
      selectedRecord: record,
      isModalVisible: true
    });

  closeModal = () => this.setState(this.INITIAL_STATE);

  handleValidate = record => {
    this.props.acceptDemand(record.id); //TODO: record must have an ID
    this.closeModal();
  };

  notify = () => {
    message.config({  
      duration: 2,
      maxCount: 1,
    })
    message.destroy();
    if (this.props.actionState.fetching) {
      message.loading("En cours d'exécution...", 0);
    } else {
      if (this.props.actionState.success) {
        message.success('Action réussie!', this.props.setDefault);
      } else if (this.props.actionState.error) {
        message.error(this.props.actionState.error, this.props.setDefault);
      }
    }
  };

  handleConfirmReject(record) {
    const rejectDemand = this.props.rejectDemand;
    const closeModal = this.closeModal.bind(this);
    Modal.confirm({
      title: 'Voulez-vous vraiment refuser ?', //TODO: this is modal dependent
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        rejectDemand(record.id);
        closeModal();
      }
    });
  }

  actionsColumn = {
    title: '',
    key: 'action',
    render: record => (
      <span>
        <Tooltip title="Afficher les détails">
          <a onClick={() => this.showModal(record)}>
            <Icon type="info-circle" />
          </a>
        </Tooltip>
        <span className="ant-divider" />
        <Tooltip title="Rejeter la demande">
          <a onClick={() => this.handleConfirmReject(record)}>
            <Icon type="close-circle-o" />
          </a>
        </Tooltip>
        <span className="ant-divider" />
        <Tooltip title="Accepter la demande">
          <a onClick={() => this.handleValidate(record)}>
            <Icon type="check-circle" />
          </a>
        </Tooltip>
      </span>
    )
  };
}

TableWithActions.propTypes = {
  initialState: PropTypes.shape({
    selectedRecord: PropTypes.object,
    isModalVisible: PropTypes.bool
  }).isRequired,
  modal: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  fetching: PropTypes.bool,
  actionState: PropTypes.shape({
    fetching: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool
  }).isRequired,

  acceptDemand: PropTypes.func.isRequired,
  rejectDemand: PropTypes.func.isRequired,
  setDefault: PropTypes.func.isRequired
};

export default TableWithActions;
