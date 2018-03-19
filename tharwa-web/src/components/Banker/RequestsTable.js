import React, { Component } from "react";
import { Table, Icon, Modal } from "antd";

import RoundedImage from "../Reusable Components/RoundedImage";

const confirm = Modal.confirm;

class RequestsTable extends Component {
  state = {
    pagination: {},
    loading: false,
    data: []
  };

  columns = [
    {
      title: "",
      dataIndex: "photo",
      key: "photo",
      render: text => (
        <span>
          <RoundedImage uri={text} height="70%" />
        </span>
      )
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom"
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom"
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: true //TODO : Définir la fonction de sort sur les dates
    },
    {
      title: "",
      key: "action",
      render: record => (
        <span>
          <a href="#" onClick={() => this.handleClickDetails(record)}>
            <Icon type="info-circle" />
          </a>
          <span className="ant-divider" />
          <a href="#" onClick={() => this.handleConfirmReject(record)}>
            <Icon type="minus-circle-o" />
          </a>
          <span className="ant-divider" />
          <a href="#" onClick={() => this.handleValidate(record)}>
            <Icon type="check-circle" />
          </a>
        </span>
      )
    }
  ];

  handleClickDetails(record) {
    //TODO : request modal to show with `record`
  }

  handleConfirmReject(record) {
    const { nom, prenom } = record;
    confirm({
      title: "Voulez-vous vraiment rejeter cette demande?",
      content: `Nom: ${nom} ${prenom}`,
      okText: "Oui",
      okType: "danger",
      cancelText: "Annuler",
      onOk() {
        //TODO : send reject action on `record`
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  handleValidate(record) {
    //TODO : send validation action on `record`
    
    // //if success call confirmValidate
    // Modal.success({
    //   title: "Demande d'inscription validée",
    //   content: ""
    // });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };
  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    //API------
    //getting records by pages of 20 for example
    pagination.total = 1; //totalcount of records=data.totalcount
    this.setState({
      loading: false,
      data: this.props.list,
      pagination
    });
  };
  componentDidMount() {
    // FETCHING HAPPENS INSIDE REDUX SAGAS AND API SERVICES
    this.fetch();
  }
  render() {
    return (
      <Table
        columns={this.columns}
        rowKey={record => record.registered}
        dataSource={this.props.list}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default RequestsTable;
