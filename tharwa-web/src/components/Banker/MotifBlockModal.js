import React, {Component} from 'react';
import { Modal,Button, Input} from 'antd';

const { TextArea } = Input;
const confirm = Modal.confirm;

class MotifBlockModal extends Component{
  constructor(props) {
    super(props);
    this.state = {value: '', error:false};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if(this.state.value!=="") this.setState({error:false});
  }

  handleOk(){
    if(this.state.value===""){
        this.setState({error:true});
    }else{
      const onOk = this.props.ok;
      const id= this.props.account;
      const motif= this.state.value;
     this.setState({error:false,value:""});
     const typeAction=this.props.action
     const action=(typeAction==1 ? "bloquer": "débloquer")
      confirm({
        title: `Voulez-vous vraiment ${action} ce compte?`,
        okText: "Oui",
        okType: "danger",
        cancelText: "Annuler",
        onOk() {
          onOk(id,motif,typeAction);
        }
      });
    }
  }

  handleCancel(){
    this.setState({error:false,value:""});
    this.props.cancel();
  }

  render(){
    const action=(this.props.action==1 ? "Bloquer": "Débloquer")
    const actionAccount=(this.props.action==1 ? "blocage": "déblocage")
    const titre=`Veuillez indiquer le motif du ${actionAccount} :`
    return(
      <Modal
      visible={this.props.visible}
      title={`${action} le compte: ${this.props.account}`}
      onCancel={this.handleCancel.bind(this)}
      footer={[
        <Button key="btn1" onClick={this.handleCancel.bind(this)}>Annuler</Button>,
        <Button key="btn2" type="primary" onClick={this.handleOk.bind(this)}>{action}</Button>,
      ]}
    >
    
      <p>{titre}</p>
      <TextArea id="motifArea" rows={4} value={this.state.value} onChange={this.handleChange}/>
      {this.state.error && <p style={{color: "red"}}>Veuillez indiquer un motif</p>}
    </Modal>

    );
  }
}
export default MotifBlockModal;