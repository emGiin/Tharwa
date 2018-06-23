import React, { Component } from 'react';
import { connect } from 'react-redux';
import deblockAccountActions  from '../redux/DeblockAccountRedux'

import { DeblockRequestsTable } from '../components/Banker'
import "./Styles/AppLayout.css";

class DeblockRequests extends Component {
 
  componentWillMount() {
    this.props.getDeblockRequestsList();
  }
 
  setDefault(){
    this.props.setDefault();
  }
  
  rejectDemand(id,account){
    this.props.deblockAccountAction({id,account,motif:null})
  }
  acceptDemand(id,account,motif){
    this.props.deblockAccountAction({id,account,motif})  
  }
  
  render() {
    return (
      <div className="container">
        <DeblockRequestsTable
          list={this.props.deblockRequestsList.list}
          listState={this.props.deblockRequestsList}
          actionState={this.props.deblockAccountState}
          rejectRequest={this.rejectDemand.bind(this)}
          acceptRequest={this.acceptDemand.bind(this)}
          setDefault={this.setDefault.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deblockRequestsList: state.deblockAccount.deblockRequests,
    deblockAccountState: state.deblockAccount.deblockAccountActions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDeblockRequestsList: () => dispatch(deblockAccountActions.deblockRequestsListRequest()),
    deblockAccountAction: params => {dispatch(deblockAccountActions.deblockAccountActionRequest(params))},
    setDefault: () => dispatch(deblockAccountActions.deblockAccountActionSetDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeblockRequests);
