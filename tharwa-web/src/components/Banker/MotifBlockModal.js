import React, {Component} from 'react';
import { Modal,Button, Input ,message} from 'antd';

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
      const block = this.props.ok;
      const id= this.props.account;
      const motif= this.state.value;
     this.setState({error:false,value:""});
      confirm({
        title: "Voulez-vous vraiment bloquer ce compte?",
        okText: "Oui",
        okType: "danger",
        cancelText: "Annuler",
        onOk() {
          block(id,motif);
        }
      });
    }
  }

  handleCancel(){
    this.setState({error:false,value:""});
    this.props.cancel();
  }

  render(){
    return(
      <Modal
      visible={this.props.visible}
      title={`Bloquer le compte: ${this.props.account}`}
      onCancel={this.handleCancel.bind(this)}
      footer={[
        <Button onClick={this.handleCancel.bind(this)}>Annuler</Button>,
        <Button type="primary" onClick={this.handleOk.bind(this)}>Bloquer</Button>,
      ]}
    >
    
      <p>Veuillez indiquer le motif du blocage: </p>
      <TextArea id="motifArea" rows={4} value={this.state.value} onChange={this.handleChange}/>
      {this.state.error && <p style={{color: "red"}}>Veuillez indiquer un motif</p>}
    </Modal>

    );
  }
}
export default MotifBlockModal;