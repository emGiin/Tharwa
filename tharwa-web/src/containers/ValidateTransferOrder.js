import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  
  render() {
    return (
      <div className="container">
        {this.state.switchScreen ? (
          <TransferOrderDetails  
            record={this.state.record}
            close={this.closeDetails.bind(this)} 
            rejectOrder={this.rejectOrder.bind(this)}
            acceptOrder={this.acceptOrder.bind(this)}
            cctionState={this.props.transferOrderActionState} 
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
