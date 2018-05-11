import React, { Component } from 'react';
import { connect } from 'react-redux';
import clientManagementActions  from '../redux/ClientManagementRedux'

import { ClientsTable, ClientDetails, MotifBlockModal } from '../components/Banker'


class AccountManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
        switchScreen: false,
        record:{},
        account:{},
        motifModalVisible: false 
    };
}

  componentWillMount() {
    console.log("moutning");
    
    this.props.getClientsList();
  }
  
  showDetails(record){
    this.setState({switchScreen:true});
    this.setState({record});
  }

  closeDetails(){
    this.setState({switchScreen:false});
  }

  action(account){
    if(account.status==="blocked"){
        this.handleDeblock(account.num);
    }
    else{
        this.handleBlock(account.num);
    }
  }

  handleBlock(id){
    this.setState({account:id});
    this.setState({motifModalVisible: true});
  }
  handleDeblock(id){
    console.log("deblocking call  ",id);
    const o={
      account:id,
      motif:""
    }
    this.props.accountAction(o);
    
  }
  handleCancelModal(){
    this.setState({motifModalVisible: false});
  }
  handleOkModal(id,motif){
    this.setState({motifModalVisible: false});
    const o={
      account:id,
      motif
    }  
    this.props.accountAction(o);
   
  }
  setDefault(){
    this.props.setDefault();
  }
  
  render() {
    return (
      <div>
        <MotifBlockModal account={this.state.account} visible={this.state.motifModalVisible} cancel={this.handleCancelModal.bind(this)} ok={this.handleOkModal.bind(this)}/>
        {this.state.switchScreen ? (
          <ClientDetails  record={this.state.record} close={this.closeDetails.bind(this)} action={this.action.bind(this)} accountActionState={this.props.accountActionState} setDefaultD={this.setDefault.bind(this)}/>
        ) : (
          <ClientsTable dataSource={this.props.clientsList.list} listState={this.props.clientsList} showDetails={this.showDetails.bind(this)}/>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientsList: state.clientManagement.clients,
    accountActionState: state.clientManagement.accountActions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClientsList: () => dispatch(clientManagementActions.clientsListRequest()),
    accountAction: params => {console.log("deblocking call  ",params);dispatch(clientManagementActions.accountActionRequest(params))},
    setDefault: () => dispatch(clientManagementActions.accountActionSetDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);
