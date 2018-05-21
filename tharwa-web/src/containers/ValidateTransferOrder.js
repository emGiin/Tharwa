import React, { Component } from 'react';
import { connect } from 'react-redux';
import {message} from 'antd';
import transferOrderActions  from '../redux/TransferOrderRedux'

import { TransferOrdersTable, TransferOrderDetails} from '../components/Banker'
import "./Styles/AppLayout.css";

class ValidateTransferOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
        switchScreen: false,
        record:{}
    };
}
  
  componentWillMount() {
    this.props.getTransferOrdersList();
  }
  
  showDetails(record){
    this.setState({switchScreen:true});
    this.setState({record});
  }

  closeDetails(){
    this.setState({switchScreen:false});
  }

  rejectOrder(id){
    console.log("reject",id);
    this.props.transferOrderAction({id, code:0})
    this.closeDetails()
  }

  acceptOrder(id){
    console.log("accept",id);
    this.props.transferOrderAction({id, code:1})
    this.closeDetails()
  }

  setDefault(){
   this.props.setDefault();
  }
  notify = () => {
    message.config({  
      duration: 2,
      maxCount: 1,
    })
    message.destroy();
    console.log(this.props.transferOrderActionState);
    
    if (this.props.transferOrderActionState.fetching) {
      message.loading("En cours d'exécution...", 0);
    } else {
      if (this.props.transferOrderActionState.success) {
        message.success('Action réussie!', this.props.setDefault);
      } else if (this.props.transferOrderActionState.error) {
        message.error(this.props.transferOrderActionState.error, this.props.setDefault);
      }
    }
  };
  render() {
    return (
      <div className="container">
      {this.notify()}
        {this.state.switchScreen ? (
          <TransferOrderDetails  
            record={this.state.record}
            close={this.closeDetails.bind(this)} 
            rejectOrder={this.rejectOrder.bind(this)}
            acceptOrder={this.acceptOrder.bind(this)}
            accountActionState={this.props.transferOrderActionState} 
            setDefault={this.setDefault.bind(this)}/>
        ) : (
          <TransferOrdersTable 
            dataSource={this.props.transferOrderList.list} 
            listState={this.props.transferOrderList}
            showDetails={this.showDetails.bind(this)}/>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transferOrderList: state.transferOrder.transferOrder,
    transferOrderActionState: state.transferOrder.transferOrderActions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTransferOrdersList: () => dispatch(transferOrderActions.transferOrderListRequest()),
    transferOrderAction: params => {dispatch(transferOrderActions.transferOrderAction(params))},
    setDefault: () => dispatch(transferOrderActions.transferOrderSetDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateTransferOrder);
