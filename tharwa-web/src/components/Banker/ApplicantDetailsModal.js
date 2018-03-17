import React, { Component } from "react";
import { Modal, Button, Icon } from "antd";
import RoundedImage from "./Reusable Components/RoundedImage";
const confirm = Modal.confirm;
class ApplicantDetailsModal extends Component{

  state = {
    loading: false,
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    const { visible, loading } = this.state;
    const record=this.props.user;
    return (
      <div>
{/* <Button type="primary" onClick={this.showModal}>Open</Button>*/}
        <Modal 
          visible={visible}
          title="Détails"
          onCancel={this.handleCancel}
          footer={[
            <Button type="primary" key="validate" size="large" onClick={this.handleValidate}>
            <Icon type="user-add" /> Valider
            </Button>,
            <Button type="danger" key="reject"  size="large"  onClick={this.handleConfirmReject}>
              <Icon type="user-delete" /> Rejeter
            </Button>,
          ]}
        >
          <RoundedImage uri={record.photo} height="170px"/>
          <h2>{record.nom} {record.prenom}</h2>
          <h4>E-mail: {record.email}</h4>
          <h4>Tel: {record.tel}</h4>
          <h4>Adresse: {record.adresse}</h4>
          <h4>Fonction: {record.fonction}</h4>
        </Modal>
        </div>
    );
  }

  handleCancel(){
    this.setState({
      visible: false,
    });
  }

  handleValidate(){
    console.log("Valider");
    //if success
    Modal.success({
      title: 'Demande d\'inscription validée',
      content: '',
    });
  }



  handleConfirmReject(nom,prenom){
    confirm({
      title: 'Voulez-vous vraiment rejeter cette demande?',
      content: `Nom: ${nom} ${prenom}`,
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        //Reject the request
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    }
  
  
}

export default ApplicantDetailsModal;


