import React, { Component } from "react";
import { connect } from "react-redux";
import { LoadingSpinner} from "../components/Reusable Components"

import ValidateActions from "../redux/ValidateTransferRedux";

import {
  TransfersTable
} from "../components/Banker";

class ValidateTransfer extends Component {
  componentWillMount(){
    this.props.getTransList();
  }

  render(){
    console.log('data',this.props.transList.list);
    return(
      this.props.transList.fetching? <LoadingSpinner />:
      <TransfersTable  setDefault={this.props.setDefault} actionState={this.props.transferAction} rejectDemand={this.props.rejectTransfer} acceptDemand={this.props.acceptTransfer} list={this.props.transList.list}/>
    );
  }
}

const mapStateToProps = state => {
  // extracting only some properties of state
  const transList = (({ list,fetching, error, success }) => ({
    list,
    fetching,
    error,
    success
  }))(state.validateTransfer);

  const transferAction= (({ actionFetching, actionError, actionSuccess }) => ({
    actionFetching,
    actionError,
    actionSuccess,
  }))(state.validateTransfer);
  return { transList, transferAction };
};

const mapDispatchToProps = dispatch => {
  return {
    getTransList: () => dispatch(ValidateActions.transListRequest()) ,
    rejectTransfer: (id)=> dispatch(ValidateActions.rejectRequest(id)) ,
    acceptTransfer: (id)=> dispatch(ValidateActions.validateRequest(id)),
    setDefault: ()=> dispatch(ValidateActions.setDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateTransfer);
