import React, { Component } from 'react';
import { connect } from 'react-redux';
import clientManagementActions  from '../redux/ClientManagementRedux'

import { ClientsTable, ClientDetails, MotifBlockModal } from '../components/Banker'
import "./Styles/AppLayout.css";

class AccountManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
        actionAccount: null,
        switchScreen: false,
        record:{},
        account:{},
        motifModalVisible: false 
    };
}

componentWillReceiveProps(nextProps) {
  console.log("dad",nextProps)
}
  componentWillMount() {
    this.props.getClientsList();
    console.log(this.props.clientsList)
  }
  
  showDetails(record){
    this.setState({switchScreen:true});
    this.setState({record});
  }

  closeDetails(){
    this.setState({switchScreen:false});
    
  }

  action(account){
    this.setState({account:account.number});
    this.setState({motifModalVisible: true, actionAccount: account.isvalid});
  }

  handleCancelModal(){
    this.setState({motifModalVisible: false});
  }
  handleOkModal(id,motif,type){
    this.setState({motifModalVisible: false, actionAccount: null});
    let code
    if(type==1) code=0
    else code=1
    const o={
      account:id,
      motif,
      type: code
    }  
    
    this.props.accountAction(o);
   
  }
  setDefault(){
    this.props.setDefault();
  }
  
  render() {
    return (
      <div className="container">
        <MotifBlockModal 
          action={this.state.actionAccount}
          account={this.state.account} 
          visible={this.state.motifModalVisible} 
          cancel={this.handleCancelModal.bind(this)} 
          ok={this.handleOkModal.bind(this)}/>
        {this.state.switchScreen ? (
          <ClientDetails  
            id={this.state.record.email} 
            list={this.props.clientsList.list} 
            close={this.closeDetails.bind(this)} 
            action={this.action.bind(this)} 
            accountActionState={this.props.accountActionState} 
            setDefault={this.setDefault.bind(this)}/>
        ) : (
          <ClientsTable 
            dataSource={this.props.clientsList.list} 
            listState={this.props.clientsList} 
            showDetails={this.showDetails.bind(this)}/>
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
    accountAction: params => {dispatch(clientManagementActions.accountActionRequest(params))},
    setDefault: () => dispatch(clientManagementActions.accountActionSetDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);
