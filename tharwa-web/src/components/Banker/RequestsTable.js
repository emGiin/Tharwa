import React, { Component } from "react";
import { Table, Icon, Modal } from "antd";
import RoundedImage from "./Reusable Components/RoundedImage";
import ApplicantDetailsModal from "./ApplicantDetailsModal";

const confirm = Modal.confirm;

class RequestsTable extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };


  columns = [{
    title: '',
    dataIndex: 'photo',
    key: 'photo',
    render: (text) => (
      <span>
       <RoundedImage uri={text} height="70%"/>
      </span>
    ),
  },{
    title: 'Nom',
    dataIndex: 'nom',
    key: 'nom',
  }, {
    title: 'Prénom',
    dataIndex: 'prenom',
    key: 'prenom',
  }, {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sorter:true,//Définir la fonction de sort sur les dates
  }, {
    title: '',
    key: 'action',
    render: (record) => (
      <span>
        <a href="#" onClick={this.handleClickDetails}><Icon type="info-circle" /></a> {/*show Modal 
        <ApplicantDetailsModal user={record} />*/}
        <span className="ant-divider" />
        <a href="#"><Icon type="minus-circle-o" onClick={()=>this.handleConfirmReject(record.nom,record.prenom)}/></a>
        <span className="ant-divider" />
        <a href="#"><Icon  type="check-circle" onClick={this.handleValidate}/></a>
      </span>
    ),
  }];

  handleClickDetails(){
    
  }

  handleConfirmReject(nom,prenom){
  confirm({
    title: 'Voulez-vous vraiment rejeter cette demande?',
    content: `Nom: ${nom} ${prenom}`,
    okText: 'Oui',
    okType: 'danger',
    cancelText: 'Annuler',
    onOk() {
      //reject the request
    },
    onCancel() {
      console.log('Cancel');
    },
  });
  }

  handleValidate(){
    //if success call confirmValidate
    Modal.success({
      title: 'Demande d\'inscription validée',
      content: '',
    });
  }

  confirmValidate(){
    Modal.success({
      title: 'Demande d\'inscription validée',
      content: '',
    });
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
      const pagination = { ...this.state.pagination };
      //API------
      //getting records by pages of 20 for example 
      pagination.total = 1;//totalcount of records=data.totalcount
      this.setState({
        loading: false,
        data: [{
          key: '1',
          photo:'https://randomuser.me/api/portraits/med/men/83.jpg',
          nom: 'John',
          prenom:'Doe',
          email: 'efzef@zefzf.azd',
          tel:'0554854852',
          fonction:'azazfzfzef'
        }, {
          key: '2',
          photo:'https://randomuser.me/api/portraits/med/men/83.jpg',
          nom: 'John',
          prenom:'Doe',
          email: 'efzef@zefzf.azd',
          tel:'0554854852',
          fonction:'azazfzfzef'
        }, {
          key: '3',
          photo:'https://randomuser.me/api/portraits/med/men/83.jpg',
          nom: 'Anna',
          prenom:'Doe',
          email: 'efzef@zefzf.azd',
          tel:'0554854852',
          fonction:'azazfzfzef'
        }],
        pagination,
      });
    
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <Table columns={this.columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default RequestsTable;



